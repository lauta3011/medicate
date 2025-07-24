import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Button, Pressable, Text } from "react-native";
import { Card } from "../ui/card";
import { Center } from "../ui/center";
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
        <Card size="lg" variant="elevated" className="m-3">
            <Input
                className="mb-3"
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
            >
                <InputField onChangeText={(text: string) => setName(text)} placeholder="nombre" />
            </Input>
            <Input
                className="mb-3"
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
            >
                <InputField onChangeText={(text: string) => setLastName(text)} placeholder="apellido" />
            </Input>
            <Input
                className="mb-3"
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
            >
                <InputField onChangeText={(text: string) => setPhone(text)} placeholder="telefono celular " />
            </Input>
            <Input
                className="mb-3"
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
            >
                <InputField onChangeText={(text: string) => setEmail(text)} placeholder="email" />
            </Input>
            <Input
                className="mb-3"
                variant="outline"
                size="lg"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
            >
                <InputField onChangeText={(text: string) => setPassword(text)} type="password" placeholder="contraseña" />
            </Input>

            <Button title="INGRESAR" onPress={() => handleSignUp()} />
            
            <Center className="my-6">
                <Pressable onPress={() => displaySignUp()}><Text>volver a login</Text></Pressable>
            </Center>
        </Card>
    );
}