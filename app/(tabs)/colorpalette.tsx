import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ColorPaletteScreen() {
    return <SafeAreaView className="bg-zinc-950 flex-1">
        <Text className="text-white">Renk Paleti</Text>
    </SafeAreaView>;
}