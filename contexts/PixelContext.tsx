import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface IPreset {
    name: string;
    description: string;
    color_temp: string;
    type: string;
}

interface RGBColor {
    r: number;
    g: number;
    b: number;
}

type ESPStatus = 'online' | 'offline' | 'checking';

interface PixelContextType {
    pixels: string[];
    setPixels: (pixels: string[]) => void;
    setActivePreset: (preset: string) => void;
    setPixelPreset: (preset: IPreset) => Promise<void>;
    setColor: (rgbColor: RGBColor) => Promise<void>;
    fetchCurrentPixels: () => Promise<void>;
    checkESPStatus: () => Promise<void>;
    isLoading: boolean;
    activePreset: string;
    espStatus: ESPStatus;
}

const PixelContext = createContext<PixelContextType | undefined>(undefined);

export const usePixels = () => {
    const context = useContext(PixelContext);
    if (context === undefined) {
        throw new Error('usePixels must be used within a PixelProvider');
    }
    return context;
};

interface PixelProviderProps {
    children: ReactNode;
}

export const PixelProvider: React.FC<PixelProviderProps> = ({ children }) => {
    const [pixels, setPixels] = useState<string[]>(
        Array.from({ length: 12 }).fill("255,255,0") as string[]
    );
    const [isLoading, setIsLoading] = useState(false);
    const [activePreset, setActivePreset] = useState<string>("");
    const [espStatus, setEspStatus] = useState<ESPStatus>('checking');

    const checkESPStatus = async () => {
        try {
            setEspStatus('checking');
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 saniye timeout
            
            const response = await fetch("http://192.168.1.7/status", {
                method: 'GET',
                signal: controller.signal,
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                setEspStatus('online');
                console.log('ESP32 is online');
            } else {
                setEspStatus('offline');
                console.log('ESP32 responded but with error');
            }
        } catch (error) {
            setEspStatus('offline');
            console.log('ESP32 is offline:', error);
        }
    };

    const fetchCurrentPixels = async () => {
        if (espStatus !== 'online') {
            console.log('ESP32 is not online, skipping pixel fetch');
            return;
        }

        try {
            const response = await fetch("http://192.168.1.7/current");
            const data = await response.json();

            if (data.current_preset && data.current_preset.length > 0) {
                setActivePreset(data.current_preset);
            } else setActivePreset("");

            if (data.led_colors && Array.isArray(data.led_colors)) {
                setPixels(data.led_colors);
            }
        } catch (error) {
            console.error('Error fetching current pixels:', error);
            // ESP yanıt vermiyorsa status'u offline yap
            setEspStatus('offline');
        }
    };

    const rgbToColorString = (rgb: RGBColor): string => {
        return `${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)}`;
    };

    const setColor = async (rgbColor: RGBColor) => {
        if (espStatus !== 'online') {
            console.log('ESP32 is not online, cannot set color');
            return;
        }

        setIsLoading(true);
        try {
            const colorString = rgbToColorString(rgbColor);
            // 12 LED için aynı rengi tekrarla
            const colorArray = Array.from({ length: 12 }).fill(colorString);

            const response = await fetch("http://192.168.1.7/setcolor", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(colorArray)
            });

            if (response.ok) {
                // ESP32'den güncel pixel durumunu al
                await fetchCurrentPixels();
            } else {
                // ESP yanıt vermiyorsa status'u offline yap
                setEspStatus('offline');
            }
        } catch (error) {
            console.error('Error setting color:', error);
            setEspStatus('offline');
        } finally {
            setIsLoading(false);
        }
    };

    const setPixelPreset = async (preset: IPreset) => {
        if (espStatus !== 'online') {
            console.log('ESP32 is not online, cannot set preset');
            return;
        }

        setIsLoading(true);
        try {
            // ESP32'ye preset gönder
            const response = await fetch("http://192.168.1.7/preset", {
                method: "POST",
                body: JSON.stringify({ preset: preset.name })
            });
            
            if (response.ok) {
                // ESP32'den güncel pixel durumunu al
                await fetchCurrentPixels();
            } else {
                // ESP yanıt vermiyorsa status'u offline yap
                setEspStatus('offline');
            }
        } catch (error) {
            console.error('Error setting preset:', error);
            setEspStatus('offline');
        } finally {
            setIsLoading(false);
        }
    };

    // Uygulama başlangıcında ESP status kontrol et
    useEffect(() => {
        checkESPStatus();
    }, []);

    // ESP online olduğunda pixel durumunu çek
    useEffect(() => {
        if (espStatus === 'online') {
            fetchCurrentPixels();
        }
    }, [espStatus]);

    // Periyodik status kontrolü (30 saniyede bir)
    useEffect(() => {
        const interval = setInterval(() => {
            checkESPStatus();
        }, 30000); // 30 saniye

        return () => clearInterval(interval);
    }, []);

    const value: PixelContextType = {
        pixels,
        activePreset,
        setPixels,
        setActivePreset,
        setPixelPreset,
        setColor,
        fetchCurrentPixels,
        checkESPStatus,
        isLoading,
        espStatus,
    };

    return (
        <PixelContext.Provider value={value}>
            {children}
        </PixelContext.Provider>
    );
}; 