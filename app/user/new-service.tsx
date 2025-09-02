import RoundedBackButton from "@/components/common/rounded-back-button";
import SafeAreaWrapper from "@/components/common/safe-area-wrapper";
import ServiceBasicInfo from "@/components/common/service-basic-info";
import LocationInfo from "@/components/common/service-location-info";
import NewLocationModal from "@/components/modals/new-location-modal";
import { Heading } from "@/components/ui/heading";
import { useNewServiceStore } from "@/store/newServiceStore";
import { useRouter } from "expo-router";
import { Button, ScrollView, Text, View } from "react-native";

export default function NewService() {
    const { addService } = useNewServiceStore();
    const router = useRouter();

    return (
        <>
            <SafeAreaWrapper className="flex-1 px-6">
                <View className="flex-row items-center justify-between mt-16 mb-8">
                    <View className="flex-1 pr-4">
                        <Heading size="6xl" className="text-slate-50 mb-2">
                            Nuevo <Text className="text-slate-300">servicio</Text>
                        </Heading>
                    </View>
                    <RoundedBackButton onPress={() => router.push('/user')} />
                </View>
                
                <ScrollView className="flex-grow" showsVerticalScrollIndicator={false}>
                    <ServiceBasicInfo />
                    <LocationInfo />
                </ScrollView>
                <View className="py-2">
                    <Button title="AGREGAR" onPress={() => addService()} />
                </View>
            </SafeAreaWrapper>
            <NewLocationModal />
        </>
    )
}