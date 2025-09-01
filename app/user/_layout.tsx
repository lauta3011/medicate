import AuthGuard from "@/components/common/auth-guard";
import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <AuthGuard>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="new-service" />
        <Stack.Screen name="edit-service" />
      </Stack>
    </AuthGuard>
  );
} 