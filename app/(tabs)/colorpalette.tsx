import { usePixels } from "@/contexts/PixelContext";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorPicker, { HueSlider, Panel1, Swatches } from "reanimated-color-picker";

export default function ColorPaletteScreen() {
    const { setColor, isLoading } = usePixels();

    const parseRgbString = (rgbString: string): { r: number; g: number; b: number } | null => {
        try {
            // "rgb(255,255,255)" formatını parse et
            const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (match) {
                return {
                    r: parseInt(match[1], 10),
                    g: parseInt(match[2], 10),
                    b: parseInt(match[3], 10)
                };
            }
            return null;
        } catch (error) {
            console.error('Error parsing RGB string:', error);
            return null;
        }
    };

    const handleColorSelect = (color: any) => {
        // console.log('Selected color:', color.rgb);
        
        try {
            const rgbObject = parseRgbString(color.rgb);
            if (rgbObject) {
                // console.log('Parsed RGB:', rgbObject);
                // ESP32'ye renk gönder
                setColor(rgbObject);
            } else {
                console.error('Failed to parse RGB string:', color.rgb);
            }
        } catch (error) {
            console.error('Error handling color selection:', error);
        }
    };

    return <SafeAreaView className="bg-zinc-950 flex-1 items-center justify-center p-8">
        <Text className="text-white text-2xl font-bold">Renk Paleti</Text>
        {/* {isLoading && <Text className="text-zinc-400 mb-4">Renk gönderiliyor...</Text>} */}
        <View className="flex-1 items-center justify-center w-full">
            <ColorPicker 
                style={{ gap: 16, width: "100%" }} 
                onCompleteJS={handleColorSelect}
            >
                <Panel1 />
                <HueSlider />
                <Swatches />
            </ColorPicker>
        </View>
    </SafeAreaView>;
}