import { fetchCities, fetchDepartment } from "@/bff/fetch";
import { SelectedValue } from "@/types";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Selector from "./selector";

export default function ServiceLocation({ handleCity, handleDepartment }: any) {
    const [departments, setDepartments] = useState<object[] | null>(null);
    const [cities, setCities] = useState<object[] | null>(null);

    
    const [selectedDepartment, setSelectedDepartment] = useState<SelectedValue>();
    const [selectedCity, setSelectedCity] = useState<SelectedValue | null>();
    


    useEffect(() => {
        async function fetchInitialData() {
            const department: any = await fetchDepartment();
            setDepartments(department);
        }
        
        async function updateCities() {
            const cities = await fetchCities(selectedDepartment!);
            setSelectedCity(null);
            handleCity(null);
            setCities(cities!);
        }

        if(!departments) {
            fetchInitialData();
            return;
        }

        updateCities();
    }, [selectedDepartment])  

    return (
        <View className="relative">
            <View className="my-4 gap-2">
                <Text className="text-typography-500 text-2xl font-light">en que departamento te encuentras</Text>
                <Selector textColor="text-typography-500" onChange={(val: SelectedValue) => { handleDepartment(val); setSelectedDepartment(val)}} value={selectedDepartment} list={departments} placeholder={"departamento de..."} />
            </View>

            {cities && <View className="my-4 gap-2">
                <Text className="text-typography-500 text-2xl font-light">y la ciudad donde lo ofreces</Text>
                <Selector textColor="text-typography-500" onChange={(val: SelectedValue) => { handleCity(val), setSelectedCity(val)}} value={selectedCity} list={cities} placeholder={"ciudad de..."}/>
            </View>}
        </View>
    )
}