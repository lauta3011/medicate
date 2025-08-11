import { useState } from "react";
import { View } from "react-native";
import LoginForm from "./login";
import SignUpForm from "./sign-up";

export default function AuthForm() {
    const [signUp, setSignUp] = useState(false);

    return (
        <View className="flex-1 items-center mt-20">
            {!signUp ? <LoginForm displaySignUp={() => setSignUp(true)} /> : <SignUpForm displaySignUp={() => setSignUp(false)} />}
        </View>
    )
}