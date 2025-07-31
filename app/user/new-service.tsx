import ServiceBasicInfo from "@/components/common/service-basic-info";
import LocationInfo from "@/components/common/service-location-info";
import NewLocationModal from "@/components/modals/new-location-modal";
import { Heading } from "@/components/ui/heading";
import { useAuthStore } from "@/store/authStore";
import { useNewServiceStore } from "@/store/newServiceStore";
import { useServiceStore } from "@/store/serviceStore";
import { Button, ScrollView, View } from "react-native";

export default function NewService() {
    const { profile } = useAuthStore();
    const { serviceForm } = useNewServiceStore();
    const { addService } = useServiceStore();

    function handleAddService() {
        const { id: user } = profile;
        // if (title && description && selectedCity && selectedDepartment && selectedService) {
            
        //     const city = selectedCity.id;
        //     const department = selectedDepartment.id;
        //     const service = selectedService.id;
            
        //     const offer = {
        //         user,
        //         title,
        //         description,
        //         city,
        //         department,
        //         service,
        //         image: selectedImage 
        //     }
        //     addService(offer);
        // }
    }

    return (
        <View className="flex-1">
            <Heading size="3xl" className="text-slate-50 mb-8">Nuevo servicio</Heading>
            <ScrollView className="flex-grow">
                <ServiceBasicInfo />
                <LocationInfo />
            </ScrollView>
            
            <NewLocationModal />
            
            <View className="py-2">
                <Button title="AGREGAR" onPress={() => handleAddService()} />
            </View>
        </View>
    )
}