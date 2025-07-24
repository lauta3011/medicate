import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function RootLayout() {
    return (
      <GluestackUIProvider mode="light">
        <View className="h-full px-6 py-16 bg-gray-600">
          <Slot />
        </View>
      </GluestackUIProvider>
    );
}