import { useAuthStore } from "@/store/authStore";
import { useServiceStore } from "@/store/serviceStore";
import Constants from 'expo-constants';
import { useRouter } from "expo-router";
import { Edit, MessageCircle, Trash2, User } from "lucide-react-native";
import { Alert, Image, Linking, Pressable, Text, View } from "react-native";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";

const { supabaseStorage } = Constants.expoConfig?.extra || {};

export default function ServiceCard({ offer }: any) {
    const { title, description, service, image_path, id, user_profile, user } = offer;
    const { profile, session } = useAuthStore();
    const { deleteService } = useServiceStore();
    const router = useRouter();

    console.log({user_profile, user});

    // Check if this is the current user's service
    const isOwnService = session && profile?.id === user;
    
    const handleEdit = () => {
        router.push(`/user/edit-service?serviceId=${id}`);
    };

    const handleDelete = () => {
        Alert.alert(
            "Eliminar Servicio",
            "¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteService(id, profile.id);
                        } catch (error) {
                            console.error('Error deleting service:', error);
                            Alert.alert("Error", "No se pudo eliminar el servicio");
                        }
                    }
                }
            ]
        );
    };

    const handleWhatsAppContact = () => {
        if (user_profile?.phone) {
            const message = `Hola ${user_profile.name}, me interesa tu servicio: ${title}`;
            const whatsappUrl = `whatsapp://send?phone=${user_profile.phone}&text=${encodeURIComponent(message)}`;
            
            Linking.canOpenURL(whatsappUrl).then(supported => {
                if (supported) {
                    Linking.openURL(whatsappUrl);
                } else {
                    Alert.alert("Error", "WhatsApp no está instalado en este dispositivo");
                }
            });
        } else {
            Alert.alert("Error", "No hay número de teléfono disponible para este usuario");
        }
    };
    
    return (
        <Card size="lg" variant="elevated" className="my-4 shadow-lg">
            {/* Header with title and action buttons */}
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1 pr-4">
                    <Heading size="2xl" className="text-slate-800 mb-2">{title}</Heading>
                    <View className="bg-blue-50 px-3 py-1 rounded-full self-start">
                        <Text className="text-blue-600 font-semibold text-sm">{service?.name}</Text>
                    </View>
                </View>
                
                {/* Action Buttons */}
                <View className="flex-row gap-2">
                    {!isOwnService && user_profile && (
                        <Pressable 
                            onPress={handleWhatsAppContact}
                            className="w-12 h-12 rounded-full bg-green-500 items-center justify-center active:bg-green-600 shadow-md"
                        >
                            <MessageCircle size={22} color="#ffffff" />
                        </Pressable>
                    )}
                    
                    {isOwnService && (
                        <>
                            <Pressable 
                                onPress={handleEdit}
                                className="w-12 h-12 rounded-full bg-blue-500 items-center justify-center active:bg-blue-600 shadow-md"
                            >
                                <Edit size={20} color="#ffffff" />
                            </Pressable>
                            <Pressable 
                                onPress={handleDelete}
                                className="w-12 h-12 rounded-full bg-red-500 items-center justify-center active:bg-red-600 shadow-md"
                            >
                                <Trash2 size={20} color="#ffffff" />
                            </Pressable>
                        </>
                    )}
                </View>
            </View>

            {/* Provider Information */}
            {user_profile && (
                <View className="bg-slate-50 p-4 rounded-lg mb-4">
                    <View className="flex-row items-center">
                        <View className="w-10 h-10 rounded-full bg-slate-200 items-center justify-center mr-3">
                            <User size={20} color="#64748b" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-700 font-semibold text-lg">
                                {user_profile.name} {user_profile.last_name}
                            </Text>
                            <Text className="text-slate-500 text-sm">Proveedor del servicio</Text>
                        </View>
                    </View>
                </View>
            )}
            
            {/* Description */}
            <View className="mb-4">
                <Text className="text-slate-600 text-base leading-6">{description}</Text>
            </View>

            {/* Service Image */}
            {image_path && (
                <View className="rounded-lg overflow-hidden bg-slate-100">
                    <Image 
                        style={{ width: '100%', height: 250 }}
                        source={{ uri: `${supabaseStorage}/services-images/images/${image_path}` }}
                        resizeMode="cover"
                    />
                </View>
            )}
        </Card>
    )
}