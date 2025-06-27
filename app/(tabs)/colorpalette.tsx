import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorPicker, { HueSlider, Panel1, Swatches } from "reanimated-color-picker";
export default function ColorPaletteScreen() {
    return <SafeAreaView className="bg-zinc-950 flex-1 items-center justify-center p-8">
        <Text className="text-white text-2xl font-bold">Renk Paleti</Text>
        <View className="flex-1 items-center justify-center w-full">
            <ColorPicker style={{ gap: 16, width: "100%" }}>
                <Panel1 />
                <HueSlider />
                <Swatches />
            </ColorPicker>
        </View>
    </SafeAreaView>;
}