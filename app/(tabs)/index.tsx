import Ring from "@/components/Ring";
import Icons from "@/components/ui/Icons";
import { usePixels } from "@/contexts/PixelContext";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { pixels, espStatus, checkESPStatus } = usePixels();

  const getStatusColor = () => {
    switch (espStatus) {
      case 'online': return '#22c55e'; // green
      case 'offline': return '#ef4444'; // red
      case 'checking': return '#eab308'; // yellow
      default: return '#6b7280'; // gray
    }
  };

  const getStatusText = () => {
    switch (espStatus) {
      case 'online': return 'Bağlı';
      case 'offline': return 'Bağlantı Yok';
      case 'checking': return 'Kontrol Ediliyor...';
      default: return 'Bilinmiyor';
    }
  };

  const getStatusIcon = () => {
    switch (espStatus) {
      case 'online': return 'CircleCheck';
      case 'offline': return 'CircleX';
      case 'checking': return 'LoaderCircle';
      default: return 'CircleAlert';
    }
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Blur Background */}
      
      <SafeAreaView className="flex-1 items-center justify-start gap-16 pt-10">
        <View className="items-center gap-4">
          <Text className="text-white text-2xl font-bold">HomePixel</Text>
          
          {/* ESP Status */}
          <TouchableOpacity 
            onPress={checkESPStatus}
            className="flex-row items-center gap-2 px-4 py-2 rounded-full border"
            style={{ borderColor: getStatusColor() }}
          >
            <Icons 
              name={getStatusIcon() as any} 
              size={16} 
              color={getStatusColor()} 
            />
            <Text 
              className="text-sm font-medium"
              style={{ color: getStatusColor() }}
            >
              ESP32: {getStatusText()}
            </Text>
          </TouchableOpacity>
        </View>

        <Ring
          pixels={pixels}
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
              <Text 
                className="text-sm font-medium"
                style={{ color: getStatusColor() }}
              >
                {getStatusText()}
              </Text>
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
      </SafeAreaView>
    </View>
  );
}