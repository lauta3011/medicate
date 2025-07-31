import AuthForm from "@/components/common/auth-form";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { SafeAreaView, Text } from "react-native";

export default function Login() {
    return (
        <SafeAreaView>
            <Center>
                <Heading size="5xl" className="text-slate-50">Ingresa a tu <Text className="text-slate-300">cuenta</Text></Heading>
            </Center>

            <AuthForm />
        </SafeAreaView>
    )
}