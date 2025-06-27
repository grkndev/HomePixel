import Icons from "@/components/ui/Icons";
import { usePixels } from "@/contexts/PixelContext";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedScreen() {
  const [available_presets, setAvailablePresets] = useState<IPreset[]>([])
  const { setPixelPreset, isLoading, activePreset } = usePixels();

  useEffect(() => {
    getAvailablePresets().then(
      (presets) => {
        setAvailablePresets(presets.presets as IPreset[])
      }
    )
  }, [])

  const handlePresetSelect = async (preset: IPreset) => {
    await setPixelPreset(preset);

  };

  return <SafeAreaView className="bg-zinc-950 flex-1 items-center justify-center p-8 gap-4">
    <Text className="text-white text-2xl font-bold">Kaydedilenler</Text>
    <FlatList
      data={available_presets}
      renderItem={({ item }) => <SavedItem activePreset={activePreset} item={item} onSelect={handlePresetSelect} isLoading={isLoading} />}
      keyExtractor={(item) => item.name}
      ItemSeparatorComponent={() => <View className="h-2" />}
      ListEmptyComponent={() => <Text className="text-white">Kaydedilenler bulunamadı</Text>}
      contentContainerStyle={{ paddingBottom: 100 }}
      className="w-full"

    />
  </SafeAreaView>;
}

function SavedItem({ item, onSelect, isLoading, activePreset }: { item: IPreset, onSelect: (preset: IPreset) => void, isLoading: boolean, activePreset: string }) {
  return <TouchableOpacity
    onPress={() => onSelect(item)}
    disabled={isLoading}
    className={`w-full flex-row items-center justify-between gap-4 p-4 border ${activePreset === item.name ? 'border-gray-500' : 'border-zinc-800'} rounded-lg ${isLoading ? 'opacity-50' : ''}`}>
    <View className="flex-row items-center gap-2">
      <Icons name="Lightbulb" size={24} color="white" />
      <Text className="text-white">{item.name}</Text>
    </View>
    <View className="flex-row items-center gap-2">
      {isLoading && <ActivityIndicator size="small" color="white" className="ml-auto" />}
      {!isLoading && activePreset === item.name && <Icons name="CircleCheck" size={24} color="gray" className="ml-auto" />}
    </View>
  </TouchableOpacity>
}

async function getAvailablePresets() {
  const presets = await fetch("http://192.168.1.7/available_presets")
  return await presets.json()
}

interface IPreset {
  name: string
  description: string
  color_temp: string
  type: string
}