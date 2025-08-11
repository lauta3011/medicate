import EditServiceForm from "@/components/common/edit-service-form";
import RoundedBackButton from "@/components/common/rounded-back-button";
import SafeAreaWrapper from "@/components/common/safe-area-wrapper";
import LocationInfo from "@/components/common/service-location-info";
import NewLocationModal from "@/components/modals/new-location-modal";
import { Heading } from "@/components/ui/heading";
import { useAuthStore } from "@/store/authStore";
import { useNewServiceStore } from "@/store/newServiceStore";
import { useServiceStore } from "@/store/serviceStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, Text, View } from "react-native";

export default function EditService() {
    const { serviceId } = useLocalSearchParams();
    const { profile } = useAuthStore();
    const { myServices, updateService, getServices, isLoading } = useServiceStore();
    const { serviceForm } = useNewServiceStore();
    const router = useRouter();
    
    const [serviceData, setServiceData] = useState<any>(null);
    const [formData, setFormData] = useState<any>(null);

    useEffect(() => {
        if (profile?.id) {
            getServices(profile.id);
        }
    }, [profile?.id]);

    // Find the service to edit - wait for both serviceId and loaded services
    useEffect(() => {
        if (serviceId && myServices.length > 0 && !isLoading) {
            // Handle both string and number IDs by converting both to strings for comparison
            const searchId = Array.isArray(serviceId) ? serviceId[0] : serviceId.toString();
            const service = myServices.find((s: any) => s.id.toString() === searchId);
            
            if (service) {
                setServiceData(service);
            } else {
                console.warn('Service not found with ID:', serviceId);
                console.warn('Available service IDs:', myServices.map(s => s.id));
                Alert.alert("Error", "Servicio no encontrado");
                router.back();
            }
        }
    }, [serviceId, myServices, isLoading]);

    const handleUpdate = async () => {
        if (!formData || !serviceId) {
            Alert.alert("Error", "Faltan datos para actualizar el servicio");
            return;
        }

        try {
            // Convert serviceId properly for update
            const updateServiceId = Array.isArray(serviceId) ? serviceId[0] : serviceId;
            
            console.log('Updating service with data:', {
                service_offer: {
                    user: profile.id,
                    title: formData.title,
                    description: formData.description,
                    service: formData.service,
                    image: formData.image
                },
                service_location: serviceForm.service_location || [],
                serviceId: updateServiceId
            });

            await updateService({
                service_offer: {
                    user: profile.id,
                    title: formData.title,
                    description: formData.description,
                    service: formData.service,
                    image: formData.image
                },
                service_location: serviceForm.service_location || [],
                serviceId: updateServiceId
            }, profile.id);
            
            Alert.alert("Éxito", "Servicio actualizado correctamente");
            router.back();
        } catch (error) {
            console.error('Error updating service:', error);
            Alert.alert("Error", "No se pudo actualizar el servicio. Inténtalo de nuevo.");
        }
    };

    // Loading state
    if (isLoading || !serviceData) {
        return (
            <SafeAreaWrapper className="flex-1 px-6">
                <View className="flex-row items-center justify-between mt-16 mb-8">
                    <View className="flex-1 pr-4">
                        <Heading size="5xl" className="text-slate-50 mb-2">
                            {isLoading ? "Cargando..." : "Servicio no encontrado"}
                        </Heading>
                    </View>
                    <RoundedBackButton />
                </View>
            </SafeAreaWrapper>
        );
    }

    return (
        <SafeAreaWrapper className="flex-1 px-6">
            {/* Header with title and back button */}
            <View className="flex-row items-center justify-between mt-16 mb-8">
                <View className="flex-1 pr-4">
                    <Heading size="5xl" className="text-slate-50 mb-2">
                        Editar <Text className="text-slate-300">servicio</Text>
                    </Heading>
                </View>
                <RoundedBackButton />
            </View>
            
            <ScrollView className="flex-grow" showsVerticalScrollIndicator={false}>
                <EditServiceForm 
                    serviceData={serviceData} 
                    onDataChange={setFormData}
                />
                <LocationInfo />
            </ScrollView>
            
            <NewLocationModal />
            
            <View className="py-2">
                <Button 
                    title="ACTUALIZAR" 
                    onPress={handleUpdate}
                    disabled={!formData || isLoading}
                />
            </View>
        </SafeAreaWrapper>
    )
} 