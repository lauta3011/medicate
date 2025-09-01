import { useAuthStore } from "@/store/authStore";
import { getAuthErrorMessage, validateEmail, validateLoginForm } from "@/utils/validation";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { Input, InputField } from "../ui/input";
import AuthErrorAlert from "./auth-error-alert";
import { ButtonLoading } from "./auth-loading";

export default function LoginForm({ displaySignUp }: any) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { signIn, isLoading, error } = useAuthStore();

    // Real-time email validation
    const handleEmailChange = (text: string) => {
        setEmail(text);
        setEmailError('');
        
        if (text.trim() && !validateEmail(text).isValid) {
            setEmailError(validateEmail(text).error || '');
        }
    };

    // Clear password error when user starts typing
    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setPasswordError('');
    };

    const handleLogin = async () => {
        if (isSubmitting || isLoading) return;
        
        // Clear previous errors
        setEmailError('');
        setPasswordError('');
        
        // Validate form
        const validation = validateLoginForm(email, password);
        if (!validation.isValid) {
            // Set field-specific errors
            validation.errors.forEach(error => {
                if (error.toLowerCase().includes('correo') || error.toLowerCase().includes('email')) {
                    setEmailError(error);
                } else if (error.toLowerCase().includes('contraseña')) {
                    setPasswordError(error);
                }
            });
            return;
        }
        
        setIsSubmitting(true);
        try {
            await signIn(email.trim(), password);
        } catch (err) {
            // Error handling is managed by the auth store
            const errorMessage = getAuthErrorMessage(err);
            Alert.alert('Error de inicio de sesión', errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <View className="w-full ">
            <View className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                {/* Global error message */}
                <AuthErrorAlert 
                    error={error ? getAuthErrorMessage(error) : null} 
                />

                {/* Email Input */}
                <View className="mb-6">
                    <Input
                        variant="outline"
                        size="lg"
                        isDisabled={isLoading || isSubmitting}
                        isInvalid={!!emailError}
                        isReadOnly={false}
                    >
                        <InputField 
                            value={email}
                            onChangeText={handleEmailChange}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#94a3b8"
                            className="text-slate-50 text-lg"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </Input>
                    {emailError ? (
                        <Text className="text-red-400 text-sm mt-2 ml-2">
                            {emailError}
                        </Text>
                    ) : null}
                </View>

                {/* Password Input */}
                <View className="mb-8">
                    <Input
                        variant="outline"
                        size="lg"
                        isDisabled={isLoading || isSubmitting}
                        isInvalid={!!passwordError}
                        isReadOnly={false}
                    >
                        <InputField  
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry
                            placeholder="Contraseña"
                            placeholderTextColor="#94a3b8"
                            className="text-slate-50 text-lg"
                            autoComplete="password"
                        />
                    </Input>
                    {passwordError ? (
                        <Text className="text-red-400 text-sm mt-2 ml-2">
                            {passwordError}
                        </Text>
                    ) : null}
                </View>

                {/* Login Button */}
                <Pressable 
                    className={`py-5 rounded-xl mb-8 ${
                        isLoading || isSubmitting 
                            ? 'bg-slate-400' 
                            : 'bg-slate-50 active:bg-slate-200'
                    }`}
                    onPress={handleLogin}
                    disabled={isLoading || isSubmitting}
                >
                    <ButtonLoading 
                        isLoading={isLoading || isSubmitting}
                        loadingText="INGRESANDO..."
                        normalText="INGRESAR"
                    />
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