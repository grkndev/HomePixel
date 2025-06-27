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

interface PixelContextType {
    pixels: string[];
    setPixels: (pixels: string[]) => void;
    setActivePreset: (preset: string) => void;
    setPixelPreset: (preset: IPreset) => Promise<void>;
    setColor: (rgbColor: RGBColor) => Promise<void>;
    fetchCurrentPixels: () => Promise<void>;
    isLoading: boolean;
    activePreset: string;
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
    const fetchCurrentPixels = async () => {
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
        }
    };

    const rgbToColorString = (rgb: RGBColor): string => {
        return `${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)}`;
    };

    const setColor = async (rgbColor: RGBColor) => {
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
            }
        } catch (error) {
            console.error('Error setting color:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const setPixelPreset = async (preset: IPreset) => {
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
            }
        } catch (error) {
            console.error('Error setting preset:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Uygulama başlangıcında mevcut pixel durumunu çek
    useEffect(() => {
        fetchCurrentPixels();
    }, []);

    const value: PixelContextType = {
        pixels,
        activePreset,
        setPixels,
        setActivePreset,
        setPixelPreset,
        setColor,
        fetchCurrentPixels,
        isLoading,

    };

    return (
        <PixelContext.Provider value={value}>
            {children}
        </PixelContext.Provider>
    );
}; 