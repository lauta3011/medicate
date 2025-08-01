import { useSearchedStore } from "@/store/searchedStore";
import { useServiceStore } from "@/store/serviceStore";
import { Text, View } from "react-native";

export default function Loading() {
    const { isLoading: searching } = useSearchedStore();
    const { isLoading: addingService } = useServiceStore();

    return (
        (searching || addingService) ? 
        <View className="bg-slate-200 z-10 opacity-50 absolute flex justify-center items-center w-full h-full">
            <Text className="font-medium text-5xl text-blue-950">cargando...</Text>
        </View> : null
    )
}