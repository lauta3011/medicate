import { useNewServiceStore } from "@/store/newServiceStore";
import { X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function LocationInfo() {
    const { serviceForm, locationModal, removeLocation } = useNewServiceStore();
    return (
        <View className="my-4 gap-2">
            <Text className="text-slate-50 text-2xl font-light">ofrezco mis servicios en: </Text>
            {serviceForm.locations && serviceForm.locations.map((item: any, index: number) => {
                return (
                    <View key={index} className="bg-slate-500 rounded-lg p-3 flex-row items-center justify-between">
                        <Text className="text-xl text-slate-50 font-normal flex-1">
                            {item.selectedCity?.name}, {item.selectedDepartment?.name}
                        </Text>
                        <Pressable 
                            onPress={() => removeLocation(index)}
                            className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center ml-3 active:bg-red-600"
                        >
                            <X size={16} color="#64748b" />
                        </Pressable>
                    </View>
                );
            })}
            <Pressable onPress={() => locationModal()} className="border border-slate-100 rounded p-2"><Text className="text-center text-xl color-slate-50 font-normal">+ AGREGAR LOCALIDAD</Text></Pressable>
        </View>
    )
}