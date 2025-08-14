import ImmersiveMode from "@/components/common/immersive-mode";
import Loading from "@/components/common/loading";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useAuthStore } from "@/store/authStore";
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
    const { isLoading } = useAuthStore();

    // useEffect(() => {
    //     initializeAuth();
    // }, [initializeAuth]);

    return (
      <SafeAreaProvider>
        <GluestackUIProvider mode="light">
          <ImmersiveMode />
          <View className="h-full px-6 bg-gray-600">
            {isLoading && <Loading />}
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' },
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="searched" />
              <Stack.Screen name="user" />
            </Stack>
          </View>
        </GluestackUIProvider>
      </SafeAreaProvider>
    );
}