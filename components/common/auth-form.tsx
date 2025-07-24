import { useState } from "react";
import { View } from "react-native";
import LoginForm from "./login";
import SignUpForm from "./sign-up";

export default function AuthForm() {
    const [signUp, setSignUp] = useState(false);

    return (
        <View className="mt-28">
            {!signUp ? <LoginForm displaySignUp={() => setSignUp(true)} /> : <SignUpForm displaySignUp={() => setSignUp(false)} />}
        </View>
    )
}