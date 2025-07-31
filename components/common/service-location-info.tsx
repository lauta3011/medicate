import { useNewServiceStore } from "@/store/newServiceStore";
import { Pressable, Text, View } from "react-native";

export default function LocationInfo() {
    const { serviceForm, locationModal } = useNewServiceStore();
    return (
        <View className="my-4 gap-2">
            <Text className="text-slate-50 text-2xl font-light">ofrezco mis servicios en: </Text>
            {serviceForm.locations && serviceForm.locations.map((item: any, index: number) => {
                return <Pressable key={index} onPress={() => locationModal()} className="bg-slate-700 rounded p-2"><Text className="text-2xl color-slate-50 font-normal">{item.selectedCity?.name}, {item.selectedDepartment?.name}</Text></Pressable>
            })}
            <Pressable onPress={() => locationModal()} className="border border-slate-100 rounded p-2"><Text className="text-center text-xl color-slate-50 font-normal">+ AGREGAR LOCALIDAD</Text></Pressable>
        </View>
    )
}