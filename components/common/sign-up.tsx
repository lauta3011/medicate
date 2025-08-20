import { useAuthStore } from "@/store/authStore";
import {
    formatPhoneNumber,
    getAuthErrorMessage,
    validateEmail,
    validateName,
    validatePassword,
    validatePhone,
    validateSignupForm
} from "@/utils/validation";
import * as ImagePicker from 'expo-image-picker';
import { Camera, User } from "lucide-react-native";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { Input, InputField } from "../ui/input";
import AuthErrorAlert from "./auth-error-alert";
import { ButtonLoading } from "./auth-loading";

export default function SignUpForm({ displaySignUp, redirectToDashboard }: any) {
    const { signUp, isLoading, error } = useAuthStore();
    const [currentSection, setCurrentSection] = useState<'personal' | 'credentials'>('personal');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    // Personal info section
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    
    // Personal info validation errors
    const [nameError, setNameError] = useState<string>('');
    const [lastNameError, setLastNameError] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');
    
    // Credentials section
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    // Credentials validation errors
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    // Field validation handlers
    const handleNameChange = (text: string) => {
        setName(text);
        setNameError('');
        
        if (text.trim() && !validateName(text, 'Nombre').isValid) {
            setNameError(validateName(text, 'Nombre').error || '');
        }
    };

    const handleLastNameChange = (text: string) => {
        setLastName(text);
        setLastNameError('');
        
        if (text.trim() && !validateName(text, 'Apellido').isValid) {
            setLastNameError(validateName(text, 'Apellido').error || '');
        }
    };

    const handlePhoneChange = (text: string) => {
        // Format phone number as user types
        const formatted = formatPhoneNumber(text);
        setPhone(formatted);
        setPhoneError('');
        
        if (text.trim() && !validatePhone(text).isValid) {
            setPhoneError(validatePhone(text).error || '');
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        setEmailError('');
        
        if (text.trim() && !validateEmail(text).isValid) {
            setEmailError(validateEmail(text).error || '');
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        setPasswordError('');
        
        if (text.trim() && !validatePassword(text).isValid) {
            setPasswordError(validatePassword(text).error || '');
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
            Alert.alert("Error", "Se necesita permiso para acceder a la galería");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setProfilePicture(result.assets[0].uri);
        }
    };

    const handleNext = () => {
        // Clear previous errors
        setNameError('');
        setLastNameError('');
        setPhoneError('');
        
        // Validate personal info fields
        let hasErrors = false;
        
        if (!name.trim()) {
            setNameError('Nombre es requerido');
            hasErrors = true;
        } else {
            const nameValidation = validateName(name, 'Nombre');
            if (!nameValidation.isValid) {
                setNameError(nameValidation.error || '');
                hasErrors = true;
            }
        }
        
        if (!lastName.trim()) {
            setLastNameError('Apellido es requerido');
            hasErrors = true;
        } else {
            const lastNameValidation = validateName(lastName, 'Apellido');
            if (!lastNameValidation.isValid) {
                setLastNameError(lastNameValidation.error || '');
                hasErrors = true;
            }
        }
        
        if (!phone.trim()) {
            setPhoneError('Teléfono es requerido');
            hasErrors = true;
        } else {
            const phoneValidation = validatePhone(phone);
            if (!phoneValidation.isValid) {
                setPhoneError(phoneValidation.error || '');
                hasErrors = true;
            }
        }
        
        if (!profilePicture) {
            Alert.alert("Foto de perfil requerida", "Por favor selecciona una foto de perfil para continuar");
            hasErrors = true;
        }
        
        if (!hasErrors) {
            setCurrentSection('credentials');
        }
    };

    const handleSignUp = async () => {
        if (isSubmitting || isLoading) return;
        
        // Clear previous errors
        setEmailError('');
        setPasswordError('');
        
        // Validate credentials
        let hasErrors = false;
        
        if (!email.trim()) {
            setEmailError('Correo electrónico es requerido');
            hasErrors = true;
        } else {
            const emailValidation = validateEmail(email);
            if (!emailValidation.isValid) {
                setEmailError(emailValidation.error || '');
                hasErrors = true;
            }
        }
        
        if (!password.trim()) {
            setPasswordError('Contraseña es requerida');
            hasErrors = true;
        } else {
            const passwordValidation = validatePassword(password);
            if (!passwordValidation.isValid) {
                setPasswordError(passwordValidation.error || '');
                hasErrors = true;
            }
        }
        
        if (hasErrors) return;
        
        // Final validation of all form data
        const userData = {
            name: name.trim(), 
            lastName: lastName.trim(), 
            phone: phone.trim(), 
            email: email.trim(), 
            password,
            profilePicture
        };
        
        const validation = validateSignupForm(userData);
        if (!validation.isValid) {
            Alert.alert('Error de validación', validation.errors.join('\n'));
            return;
        }
        
        setIsSubmitting(true);
        try {
            await signUp(userData);
        } catch (err) {
            const errorMessage = getAuthErrorMessage(err);
            Alert.alert('Error al crear cuenta', errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (currentSection === 'personal') {
        return (
            <View className="w-full px-4">
                <View className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                    {/* Header */}
                    <View className="items-center mb-8">
                        <Text className="text-slate-50 text-2xl font-bold mb-2">Información Personal</Text>
                        <Text className="text-slate-300 text-center">Paso 1 de 2</Text>
                    </View>

                    {/* Global error message */}
                    <AuthErrorAlert 
                        error={error ? getAuthErrorMessage(error) : null} 
                    />

                    {/* Profile Picture */}
                    <View className="items-center mb-8">
                        <Pressable 
                            onPress={pickImage}
                            disabled={isLoading || isSubmitting}
                            className={`w-32 h-32 rounded-full items-center justify-center border-2 ${
                                isLoading || isSubmitting 
                                    ? 'bg-slate-600 border-slate-400' 
                                    : 'bg-slate-700 border-slate-500 active:bg-slate-600'
                            }`}
                        >
                            {profilePicture ? (
                                <Image 
                                    source={{ uri: profilePicture }} 
                                    className="w-full h-full rounded-full"
                                    resizeMode="cover"
                                />
                            ) : (
                                <>
                                    <Camera size={32} color="#94a3b8" />
                                    <Text className="text-slate-300 text-sm mt-2 text-center">
                                        Seleccionar{'\n'}foto de perfil
                                    </Text>
                                </>
                            )}
                        </Pressable>
                        {profilePicture && (
                            <Pressable onPress={pickImage} className="mt-3" disabled={isLoading || isSubmitting}>
                                <Text className="text-blue-400 text-sm">Cambiar foto</Text>
                            </Pressable>
                        )}
                    </View>

                    {/* Name Input */}
                    <View className="mb-6">
                        <Input variant="outline" size="lg" isInvalid={!!nameError} isDisabled={isLoading || isSubmitting}>
                            <InputField 
                                value={name}
                                onChangeText={handleNameChange}
                                placeholder="Nombre"
                                placeholderTextColor="#94a3b8"
                                className="text-slate-50 text-lg"
                                autoCapitalize="words"
                            />
                        </Input>
                        {nameError ? (
                            <Text className="text-red-400 text-sm mt-2 ml-2">
                                {nameError}
                            </Text>
                        ) : null}
                    </View>
                    
                    {/* Last Name Input */}
                    <View className="mb-6">
                        <Input variant="outline" size="lg" isInvalid={!!lastNameError} isDisabled={isLoading || isSubmitting}>
                            <InputField 
                                value={lastName}
                                onChangeText={handleLastNameChange}
                                placeholder="Apellido"
                                placeholderTextColor="#94a3b8"
                                className="text-slate-50 text-lg"
                                autoCapitalize="words"
                            />
                        </Input>
                        {lastNameError ? (
                            <Text className="text-red-400 text-sm mt-2 ml-2">
                                {lastNameError}
                            </Text>
                        ) : null}
                    </View>
                    
                    {/* Phone Input */}
                    <View className="mb-8">
                        <Input variant="outline" size="lg" isInvalid={!!phoneError} isDisabled={isLoading || isSubmitting}>
                            <InputField 
                                value={phone}
                                onChangeText={handlePhoneChange}
                                placeholder="Teléfono celular (ej: +56 9 1234 5678)"
                                placeholderTextColor="#94a3b8"
                                className="text-slate-50 text-lg"
                                keyboardType="phone-pad"
                            />
                        </Input>
                        {phoneError ? (
                            <Text className="text-red-400 text-sm mt-2 ml-2">
                                {phoneError}
                            </Text>
                        ) : null}
                    </View>

                    {/* Next Button */}
                    <Pressable 
                        className={`py-5 rounded-xl mb-6 ${
                            isLoading || isSubmitting 
                                ? 'bg-slate-400' 
                                : 'bg-slate-50 active:bg-slate-200'
                        }`}
                        onPress={handleNext}
                        disabled={isLoading || isSubmitting}
                    >
                        <ButtonLoading 
                            isLoading={isLoading || isSubmitting}
                            loadingText="PROCESANDO..."
                            normalText="SIGUIENTE"
                        />
                    </Pressable>
                    
                    {/* Back to Login */}
                    <View className="items-center">
                        <Pressable onPress={displaySignUp} disabled={isLoading || isSubmitting}>
                            <Text className="text-slate-300 text-center text-lg">
                                volver a login
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }

    // Credentials Section
    return (
        <View className="w-full px-4">
            <View className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                {/* Header */}
                <View className="items-center mb-8">
                    <Text className="text-slate-50 text-2xl font-bold mb-2">Credenciales</Text>
                    <Text className="text-slate-300 text-center">Paso 2 de 2</Text>
                </View>

                {/* Global error message */}
                <AuthErrorAlert 
                    error={error ? getAuthErrorMessage(error) : null} 
                />

                {/* Show selected profile picture */}
                <View className="items-center mb-8">
                    <View className="w-20 h-20 rounded-full border-2 border-slate-500">
                        {profilePicture ? (
                            <Image 
                                source={{ uri: profilePicture }} 
                                className="w-full h-full rounded-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="w-full h-full rounded-full bg-slate-700 items-center justify-center">
                                <User size={24} color="#94a3b8" />
                            </View>
                        )}
                    </View>
                    <Text className="text-slate-300 text-center mt-2">{name} {lastName}</Text>
                </View>

                {/* Email Input */}
                <View className="mb-6">
                    <Input variant="outline" size="lg" isInvalid={!!emailError} isDisabled={isLoading || isSubmitting}>
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
                    <Input variant="outline" size="lg" isInvalid={!!passwordError} isDisabled={isLoading || isSubmitting}>
                        <InputField 
                            value={password}
                            onChangeText={handlePasswordChange}
                            placeholder="Contraseña (mín. 6 caracteres, mayúscula, minúscula y número)"
                            placeholderTextColor="#94a3b8"
                            className="text-slate-50 text-lg"
                            secureTextEntry
                            autoComplete="new-password"
                        />
                    </Input>
                    {passwordError ? (
                        <Text className="text-red-400 text-sm mt-2 ml-2">
                            {passwordError}
                        </Text>
                    ) : null}
                </View>

                {/* Action Buttons */}
                <View className="gap-4">
                    <Pressable 
                        className={`py-5 rounded-xl ${
                            isLoading || isSubmitting 
                                ? 'bg-slate-400' 
                                : 'bg-slate-50 active:bg-slate-200'
                        }`}
                        onPress={handleSignUp}
                        disabled={isLoading || isSubmitting}
                    >
                        <ButtonLoading 
                            isLoading={isLoading || isSubmitting}
                            loadingText="CREANDO CUENTA..."
                            normalText="CREAR CUENTA"
                        />
                    </Pressable>
                    
                    <Pressable 
                        className={`py-4 rounded-xl ${
                            isLoading || isSubmitting 
                                ? 'bg-slate-500' 
                                : 'bg-slate-600 active:bg-slate-700'
                        }`}
                        onPress={() => setCurrentSection('personal')}
                        disabled={isLoading || isSubmitting}
                    >
                        <Text className="text-slate-50 text-center font-semibold text-lg">
                            VOLVER
                        </Text>
                    </Pressable>
                </View>
                
                {/* Back to Login */}
                <View className="items-center mt-6">
                    <Pressable onPress={displaySignUp} disabled={isLoading || isSubmitting}>
                        <Text className="text-slate-300 text-center text-lg">
                            volver a login
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}