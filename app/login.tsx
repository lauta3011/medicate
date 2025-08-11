import AuthForm from "@/components/common/auth-form";
import RoundedBackButton from "@/components/common/rounded-back-button";
import SafeAreaWrapper from "@/components/common/safe-area-wrapper";
import { Heading } from "@/components/ui/heading";
import { Text, View } from "react-native";

export default function Login() {
    return (
        <SafeAreaWrapper className="flex-1 ">
            {/* Header with title and back button */}
            <View className="flex-row items-center justify-between mt-16 mb-8">
                <View className="flex-1 pr-4">
                    <Heading size="5xl" className="text-slate-50 mb-2">
                        Ingresa a tu <Text className="text-slate-300">Cuenta</Text>
                    </Heading>
                </View>
                <RoundedBackButton />
            </View>
            <View className="flex-1 h-fit">
                <AuthForm />
            </View>
        </SafeAreaWrapper>
    )
}