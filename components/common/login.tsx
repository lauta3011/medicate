import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Input, InputField } from "../ui/input";

export default function LoginForm({ displaySignUp }: any) {
    const [userName, setUserName] = useState<string>();
    const [userPassword, setUserPassword] = useState<string>();
    const { signIn } = useAuthStore();

    function handleLogin(userName: string, userPassword: string) {
        if (userName && userPassword) {
            signIn(userName, userPassword );  
        }
    }
    
    return (
        <View className="w-full ">
            <View className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                <Input
                    className="mb-6"
                    variant="outline"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField 
                        onChangeText={(text: string) => setUserName(text)} 
                        placeholder="email"
                        placeholderTextColor="#94a3b8"
                        className="text-slate-50 text-lg"
                    />
                </Input>

                <Input
                    className="mb-8"
                    variant="outline"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField  
                        onChangeText={(text: string) => setUserPassword(text)} 
                        type="password" 
                        placeholder="contraseña"
                        placeholderTextColor="#94a3b8"
                        className="text-slate-50 text-lg"
                    />
                </Input>

                <Pressable 
                    className="bg-slate-50 py-5 rounded-xl mb-8 active:bg-slate-200"
                    onPress={() => handleLogin(userName!, userPassword!)}
                >
                    <Text className="text-slate-800 text-center font-semibold text-xl">
                        INGRESAR
                    </Text>
                </Pressable>
                
                <View className="items-center">            
                    <Pressable onPress={() => displaySignUp()}>
                        <Text className="text-slate-300 text-center text-lg">
                            crear una nueva cuenta
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}