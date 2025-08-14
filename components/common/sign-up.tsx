import { useAuthStore } from "@/store/authStore";
import * as ImagePicker from 'expo-image-picker';
import { Camera, User } from "lucide-react-native";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { Input, InputField } from "../ui/input";

export default function SignUpForm({ displaySignUp, redirectToDashboard }: any) {
    const { signUp } = useAuthStore();
    const [currentSection, setCurrentSection] = useState<'personal' | 'credentials'>('personal');
    
    // Personal info section
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    
    // Credentials section
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
        if (!profilePicture || !name || !lastName || !phone) {
            Alert.alert("Error", "Por favor completa todos los campos y selecciona una foto de perfil");
            return;
        }
        setCurrentSection('credentials');
    };

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }
        
        const userData = {
            name, 
            lastName, 
            phone, 
            email, 
            password,
            profilePicture
        };
        signUp(userData);
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

                    {/* Profile Picture */}
                    <View className="items-center mb-8">
                        <Pressable 
                            onPress={pickImage}
                            className="w-32 h-32 rounded-full bg-slate-700 items-center justify-center border-2 border-slate-500 active:bg-slate-600"
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
                            <Pressable onPress={pickImage} className="mt-3">
                                <Text className="text-blue-400 text-sm">Cambiar foto</Text>
                            </Pressable>
                        )}
                    </View>

                    {/* Personal Info Fields */}
                    <Input className="mb-6" variant="outline" size="lg">
                        <InputField 
                            value={name}
                            onChangeText={setName}
                            placeholder="Nombre"
                            placeholderTextColor="#94a3b8"
                            className="text-slate-50 text-lg"
                        />
                    </Input>
                    
                    <Input className="mb-6" variant="outline" size="lg">
                        <InputField 
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Apellido"
                            placeholderTextColor="#94a3b8"
                            className="text-slate-50 text-lg"
                        />
                    </Input>
                    
                    <Input className="mb-8" variant="outline" size="lg">
                        <InputField 
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Teléfono celular"
                            placeholderTextColor="#94a3b8"
                            className="text-slate-50 text-lg"
                            keyboardType="phone-pad"
                        />
                    </Input>

                    {/* Next Button */}
                    <Pressable 
                        className="bg-slate-50 py-5 rounded-xl mb-6 active:bg-slate-200"
                        onPress={handleNext}
                    >
                        <Text className="text-slate-800 text-center font-semibold text-xl">
                            SIGUIENTE
                        </Text>
                    </Pressable>
                    
                    {/* Back to Login */}
                    <View className="items-center">
                        <Pressable onPress={displaySignUp}>
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

                {/* Credentials Fields */}
                <Input className="mb-6" variant="outline" size="lg">
                    <InputField 
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#94a3b8"
                        className="text-slate-50 text-lg"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </Input>
                
                <Input className="mb-8" variant="outline" size="lg">
                    <InputField 
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Contraseña"
                        placeholderTextColor="#94a3b8"
                        className="text-slate-50 text-lg"
                        secureTextEntry
                    />
                </Input>

                {/* Action Buttons */}
                <View className="gap-4">
                    <Pressable 
                        className="bg-slate-50 py-5 rounded-xl active:bg-slate-200"
                        onPress={handleSignUp}
                    >
                        <Text className="text-slate-800 text-center font-semibold text-xl">
                            CREAR CUENTA
                        </Text>
                    </Pressable>
                    
                    <Pressable 
                        className="bg-slate-600 py-4 rounded-xl active:bg-slate-700"
                        onPress={() => setCurrentSection('personal')}
                    >
                        <Text className="text-slate-50 text-center font-semibold text-lg">
                            VOLVER
                        </Text>
                    </Pressable>
                </View>
                
                {/* Back to Login */}
                <View className="items-center mt-6">
                    <Pressable onPress={displaySignUp}>
                        <Text className="text-slate-300 text-center text-lg">
                            volver a login
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}