import ServiceBasicInfo from "@/components/common/service-basic-info";
import LocationInfo from "@/components/common/service-location-info";
import NewLocationModal from "@/components/modals/new-location-modal";
import { Heading } from "@/components/ui/heading";
import { useNewServiceStore } from "@/store/newServiceStore";
import { Button, ScrollView, View } from "react-native";

export default function NewService() {
    const { serviceForm, addService } = useNewServiceStore();

    return (
        <View className="flex-1">
            <Heading size="3xl" className="text-slate-50 mb-8">Nuevo servicio</Heading>
            <ScrollView className="flex-grow">
                <ServiceBasicInfo />
                <LocationInfo />
            </ScrollView>
            
            <NewLocationModal />
            
            <View className="py-2">
                <Button title="AGREGAR" onPress={() => addService()} />
            </View>
        </View>
    )
}