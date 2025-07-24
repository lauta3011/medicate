import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Button, Pressable, Text } from "react-native";
import { Card } from "../ui/card";
import { Center } from "../ui/center";
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
        <Card size="lg" variant="elevated" className="m-3 pt-8">
            <Input
            className="mb-3"
            variant="outline"
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            >
                <InputField onChangeText={(text: string) => setUserName(text)} placeholder="email" />
            </Input>

            <Input
            className="mb-3"
            variant="outline"
            size="lg"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            >
                <InputField  onChangeText={(text: string) => setUserPassword(text)} type="password" placeholder="contraseña" />
            </Input>

            <Button title="INGRESAR" onPress={() => handleLogin(userName!, userPassword!)} />
            
            <Center className="my-6">            
                <Pressable onPress={() => displaySignUp()}><Text>crear una nueva cuenta</Text></Pressable>
            </Center>
        </Card>
    )
}