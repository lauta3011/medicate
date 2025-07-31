import ServiceCard from "@/components/common/service-card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { useSearchedStore } from "@/store/searchedStore";
import { SafeAreaView, ScrollView, Text } from "react-native";

export default function Searched() {
    const { searched, services } = useSearchedStore();
    const { city, service } = searched;
    return (
         <SafeAreaView className="flex-1 justify-between">
        
            <Center>
                <Heading size="5xl" className="text-slate-50 mb-16">{service} en <Text className="text-slate-300">{city}</Text></Heading>
            </Center>

            <ScrollView className="flex-1">
                {services.length > 0 && <>
                    {services.map((item: any, index: any) => {
                        return <ServiceCard key={index} offer={item}/>
                    })}
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    )
}