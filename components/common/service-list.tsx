import { useServiceStore } from "@/store/serviceStore";
import { useEffect } from "react";
import { View } from "react-native";
import NewServicePlaceholder from "./new-service-placeholder";
import ServiceCard from "./service-card";

export default function ServicesList({ user }: any) {
    const { myServices, getServices } = useServiceStore();
    
    useEffect(() => {
        getServices(user)
    }, []);
    
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