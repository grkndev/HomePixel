import { rgbToHex } from "@/lib/utils";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export default function Ring({
    pixels
}: {
    pixels: string[]
}) {
    // const pixels = Array.from({ length: 12 }, (_, index) => index);

    const containerSize = 288 + 12;
    const borderWidth = 14;
    const ringRadius = (containerSize / 2) - (borderWidth / 2) - 24;
    const centerX = 144;
    const centerY = 144;

    const getPixelPosition = (index: number) => {
        const angle = (index * 360 / 12) * (Math.PI / 180);
        const x = centerX + ringRadius * Math.cos(angle - Math.PI / 2) - 14;
        const y = centerY + ringRadius * Math.sin(angle - Math.PI / 2) - 14;
        return { x: x - 24, y: y - 24 };
    }

    const bgValue = useSharedValue(0)
    const bgAnimationStyle = useAnimatedStyle(() => ({
        opacity: bgValue.value
    }));
    useEffect(() => {
        bgValue.value = withRepeat(withTiming(1, { duration: 1000, easing: Easing.steps(1) }), -1, true)
    }, [])


    return (
        <View className="w-72 h-72 rounded-full border-2 border-gray-700 relative p-2 items-center justify-center">
            <View className="absolute w-1/4 aspect-[9/16] border-2 border-gray-700 items-center justify-center">
                <Text className="text-zinc-500 text-xs">ESP32-C3</Text>
                <Animated.View className="w-2 h-2 bg-blue-500 rounded-sm" style={[bgAnimationStyle]} />
            </View>
            <View className="w-full h-full rounded-full border-2 border-gray-700 " />
            {
                pixels.map((pixel, pixelIndex) => {
                    const position = getPixelPosition(pixelIndex);
                    const color = rgbToHex(parseInt(pixel.split(',')[0]), parseInt(pixel.split(',')[1]), parseInt(pixel.split(',')[2]));
                    return (
                        <View key={pixelIndex} className="absolute "
                            style={{
                                left: position.x,
                                top: position.y
                            }}>
                            <Pixel color={color} />
                        </View>
                    )
                })
            }
        </View>
    );
}
function Pixel({ color }: { color: string }) {
    return (
        <View className="w-10 h-10 p-1  border border-gray-700">
            <View className="w-full h-full rounded-full border border-gray-500" style={{ backgroundColor: color }} />
        </View>
    );
}