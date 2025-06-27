import { PixelProvider } from '@/contexts/PixelContext';
import "@/global.css";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from "react-native";
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PixelProvider>
      <View className="bg-zinc-950 flex-1">
        <Stack screenOptions={{ animation: "simple_push", contentStyle: { backgroundColor: "#000000" } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, contentStyle: { backgroundColor: "#000000" } }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </View>
    </PixelProvider>
  );
}
