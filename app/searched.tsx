import RoundedBackButton from "@/components/common/rounded-back-button";
import SafeAreaWrapper from "@/components/common/safe-area-wrapper";
import ServiceCard from "@/components/common/service-card";
import { Heading } from "@/components/ui/heading";
import { useSearchedStore } from "@/store/searchedStore";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Searched() {
    const { searched, services } = useSearchedStore();
    const { city, service } = searched;
    const router = useRouter();
    
    return (
        <SafeAreaWrapper className="flex-1 px-6">
            {/* Header with title and back button */}
            <View className="flex-row items-center justify-between mt-16 mb-8">
                <View className="flex-1 pr-4">
                    <Heading size="6xl" className="text-slate-50 mb-2">
                        {service} en <Text className="text-slate-300">{city}</Text>
                    </Heading>
                </View>
                <RoundedBackButton onPress={() => router.push('/')} />
            </View>

            {/* Services list */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {services.length > 0 ? (
                    services.map((item: any, index: any) => (
                        <ServiceCard key={index} offer={item}/>
                    ))
                ) : (
                    <View className="flex-1 items-center justify-center py-20">
                        <Text className="text-slate-400 text-lg text-center">
                            No se encontraron servicios en esta ubicación
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaWrapper>
    )
}