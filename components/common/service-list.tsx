import { useServiceStore } from "@/store/serviceStore";
import { useEffect } from "react";
import { Text, View } from "react-native";
import NewServicePlaceholder from "./new-service-placeholder";
import ServiceCard from "./service-card";

export default function ServicesList({ user }: any) {
    const { myServices, getServices, isLoading } = useServiceStore();
    
    useEffect(() => {
        if (user) {
            getServices(user);
        }
    }, [user]);
    
    if (isLoading) {
        return (
            <View className="py-8">
                <Text className="text-slate-50 text-center text-lg">Cargando servicios...</Text>
            </View>
        );
    }
    
    return (
        <View >
            {myServices.length > 0 && <>
                {myServices.map((item: any, index: any) => {
                    return <ServiceCard key={index} offer={item}/>
                })}
                </>
            }
            {myServices.length == 0 && <NewServicePlaceholder />}
        </View> 
    )
}