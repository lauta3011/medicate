import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Input, InputField } from "../ui/input";

export default function SignUpForm({ displaySignUp, redirectToDashboard }: any) {
    const { signUp } = useAuthStore();
    const [name, setName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleSignUp = async () => {
        if (name && lastName && phone && email && password) {
            const userData = {
                name, lastName, phone, email, password
            }
            signUp(userData);
        }
    }

    return (
        <View className="w-full px-4">
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
                        onChangeText={(text: string) => setName(text)} 
                        placeholder="nombre"
                        placeholderTextColor="#94a3b8"
                        className="text-slate-50 text-lg"
                    />
                </Input>
                
                <Input
                    className="mb-6"
                    variant="outline"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField 
                        onChangeText={(text: string) => setLastName(text)} 
                        placeholder="apellido"
                        placeholderTextColor="#94a3b8"
                        className="text-slate-50 text-lg"
                    />
                </Input>
                
                <Input
                    className="mb-6"
                    variant="outline"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField 
                        onChangeText={(text: string) => setPhone(text)} 
                        placeholder="telefono celular"
                        placeholderTextColor="#94a3b8"
                        className="text-slate-50 text-lg"
                    />
                </Input>
                
                <Input
                    className="mb-6"
                    variant="outline"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                >
                    <InputField 
                        onChangeText={(text: string) => setEmail(text)} 
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
                        onChangeText={(text: string) => setPassword(text)} 
                        type="password" 
                        placeholder="contraseña"
                        placeholderTextColor="#94a3b8"
                        className="text-slate-50 text-lg"
                    />
                </Input>

                <Pressable 
                    className="bg-slate-50 py-5 rounded-xl mb-8 active:bg-slate-200"
                    onPress={() => handleSignUp()}
                >
                    <Text className="text-slate-800 text-center font-semibold text-xl">
                        REGISTRARSE
                    </Text>
                </Pressable>
                
                <View className="items-center">
                    <Pressable onPress={() => displaySignUp()}>
                        <Text className="text-slate-300 text-center text-lg">
                            volver a login
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}