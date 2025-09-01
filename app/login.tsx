import AuthForm from "@/components/common/auth-form";
import RoundedBackButton from "@/components/common/rounded-back-button";
import SafeAreaWrapper from "@/components/common/safe-area-wrapper";
import { Heading } from "@/components/ui/heading";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Login() {
    const router = useRouter();
    return (
        <SafeAreaWrapper className="flex-1 ">
            {/* Header with title and back button */}
            <View className="flex-row items-center justify-between mt-16 mb-8">
                <View className="flex-1 pr-4">
                    <Heading size="6xl" className="text-slate-50 mb-2">
                        Ingresa a tu <Text className="text-slate-300">Cuenta</Text>
                    </Heading>
                </View>
                <RoundedBackButton onPress={() => router.push('/')} />
            </View>
            <View className="flex-1 h-fit">
                <AuthForm />
            </View>
        </SafeAreaWrapper>
    )
}