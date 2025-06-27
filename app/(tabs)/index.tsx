import Ring from "@/components/Ring";
import Icons from "@/components/ui/Icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return <SafeAreaView className="bg-zinc-950 flex-1 items-center justify-start gap-16 pt-10">
    <Text className="text-white text-2xl font-bold">HomePixel</Text>
    <Ring
      pixels={
        Array.from({ length: 12 }).fill("255,0,0") as string[]
      }
    />
    <View className="items-start justify-between border border-zinc-800 rounded-2xl p-4 w-2/3 gap-2">
      <View className="flex-row items-center justify-between w-full gap-4">
        <View className="flex-row items-center gap-2">
          <Icons name="Microchip" size={16} />
          <Text className="text-white text-sm font-medium">Microchip:</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-white text-sm font-medium">ESP32-C3</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between w-full gap-4">
        <View className="flex-row items-center gap-2">
          <Icons name="Network" size={16} />
          <Text className="text-white text-sm font-medium">IP:</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-white text-sm font-medium">192.168.1.7</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between w-full gap-4">
        <View className="flex-row items-center gap-2">
          <Icons name="Wifi" size={16} />
          <Text className="text-white text-sm font-medium">Connection Type:</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-white text-sm font-medium">WiFi</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between w-full gap-4">
        <View className="flex-row items-center gap-2">
          <Icons name="Cable" size={16} />
          <Text className="text-white text-sm font-medium">Status:</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-white text-sm font-medium">Connected</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between w-full gap-4">
        <View className="flex-row items-center gap-2">
          <Icons name="Activity" size={16} />
          <Text className="text-white text-sm font-medium">Uptime:</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-white text-sm font-medium">10:00:00</Text>
        </View>
      </View>
    </View>
  </SafeAreaView>;
}