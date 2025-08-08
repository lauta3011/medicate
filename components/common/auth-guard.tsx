import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Loading from "./loading";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { session, profile, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!session || !profile)) {
      router.replace('/login');
    }
  }, [session, profile, isLoading, router]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Loading />
      </View>
    );
  }

  if (!session || !profile) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-slate-50">Redirecting to login...</Text>
      </View>
    );
  }

  return <>{children}</>;
} 