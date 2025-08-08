import AuthForm from "@/components/common/auth-form";
import RoundedBackButton from "@/components/common/rounded-back-button";
import SafeAreaWrapper from "@/components/common/safe-area-wrapper";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text, View } from "react-native";

export default function Login() {
    return (
        <SafeAreaWrapper className="flex-1 px-6">
            {/* Header with title and back button */}
            <View className="flex-row items-center justify-between mt-16 mb-8">
                <View className="flex-1 pr-4">
                    <Heading size="5xl" className="text-slate-50 mb-2">
                        ingresa a tu <Text className="text-slate-300">Cuenta</Text>
                    </Heading>
                </View>
                <RoundedBackButton />
            </View>

            <Center className="flex-1">
                <AuthForm />
            </Center>
        </SafeAreaWrapper>
    )
}