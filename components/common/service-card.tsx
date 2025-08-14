import { useAuthStore } from "@/store/authStore";
import { useServiceStore } from "@/store/serviceStore";
import Constants from 'expo-constants';
import { usePathname, useRouter } from "expo-router";
import { Edit, MessageCircle, Trash2, User } from "lucide-react-native";
import { Alert, Image, Linking, Pressable, Text, View } from "react-native";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";

const { supabaseStorage } = Constants.expoConfig?.extra || {};

export default function ServiceCard({ offer }: any) {
    const { title, description, image_path, id, user: userProfile } = offer;
    const { profile, session } = useAuthStore();
    const { deleteService } = useServiceStore();
    const router = useRouter();
    const pathname = usePathname();

    // Check if we're on the user dashboard (user's own services)
    const isUserDashboard = pathname === '/user' || pathname === '/user/index';
    
    // Show edit/delete buttons only on user dashboard
    const showActionButtons = isUserDashboard;
    
    // Show WhatsApp button only when NOT on user dashboard (i.e., search results or other views)
    const showWhatsApp = !isUserDashboard;
    
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
        if (userProfile?.phone) {
            const message = `Hola ${userProfile.name} te hablo desde Conectate por tu servicio de ${title}`;
            const whatsappUrl = `whatsapp://send?phone=${userProfile.phone}&text=${encodeURIComponent(message)}`;
            
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
                </View>
                
                {/* Action Buttons */}
                <View className="flex-row gap-2">                    
                    {/* Edit/Delete buttons - only on user dashboard */}
                    {showActionButtons && (
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

            {/* Provider Information - always visible */}
            {userProfile && (
                <View className="bg-gray-200 p-4 rounded-xl mb-4">
                    <View className="flex-row items-center">
                        <View className="w-12 h-12 rounded-full bg-slate-200 items-center justify-center mr-3 overflow-hidden">
                            {userProfile.image_path ? (
                                <Image 
                                    source={{ uri: `${supabaseStorage}/profile-images/images/${userProfile.image_path}` }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            ) : (
                                <User size={20} color="#64748b" />
                            )}
                        </View>
                        <View className="flex-1">
                            <Text className="text-slate-700 font-semibold text-lg">
                                {userProfile.name} {userProfile.last_name}
                            </Text>
                            <Text className="text-slate-600 text-sm">
                                {userProfile.description && userProfile.description !== 'hardcoded aaaa' 
                                    ? userProfile.description 
                                    : 'Proveedor del servicio'
                                }
                            </Text>
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
            
            {/* WhatsApp Contact Button - only when NOT on user dashboard */}
            {showWhatsApp && userProfile && (
                <Pressable 
                    onPress={handleWhatsAppContact}
                    className="flex-row my-4 justify-center items-center bg-green-500 px-4 py-3 rounded-xl active:bg-green-800 shadow-md"
                >
                    <MessageCircle size={20} color="#ffffff" />
                    <Text className="text-white font-semibold ml-2">Conectate!</Text>
                </Pressable>
            )}
        </Card>
    )
}