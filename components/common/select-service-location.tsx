import { fetchCities, fetchDepartment } from "@/bff/fetch";
import { SelectedValue } from "@/types";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Selector from "./selector";

export default function ServiceLocation({ handleCity, handleDepartment }: any) {
    const pathname = usePathname();
    const [departments, setDepartments] = useState<object[] | null>(null);
    const [cities, setCities] = useState<object[] | null>(null);

    
    const [selectedDepartment, setSelectedDepartment] = useState<SelectedValue>();
    const [selectedCity, setSelectedCity] = useState<SelectedValue | null>();
    
    // Check if we're on index page (search) or user pages for styling
    const isIndexPage = pathname === '/';
    
    // Determine text color based on page
    const textColor = isIndexPage ? "text-slate-900" : "text-typography-500";


    useEffect(() => {
        async function fetchInitialData() {
            const department: any = await fetchDepartment();
            setDepartments(department);
        }
        
        async function updateCities() {
            if (selectedDepartment) {
                const cities = await fetchCities(selectedDepartment);
                setSelectedCity(null);
                handleCity(null);
                setCities(cities!);
            }
        }

        if(!departments) {
            fetchInitialData();
            return;
        }

        if (selectedDepartment) {
            updateCities();
        }
    }, [selectedDepartment])  

    return (
        <View className="relative flex-1">
            <View className="my-4 gap-2">
                <Text className={`${textColor} text-2xl font-light`}>en que departamento te encuentras</Text>
                <Selector isDisabled={false} textColor={textColor} onChange={(val: SelectedValue) => { handleDepartment(val); setSelectedDepartment(val)}} value={selectedDepartment} list={departments} placeholder={"departamento de..."} />
            </View>

            <View className="my-4 gap-2">
                <Text className={`${textColor} text-2xl font-light`}>y la ciudad donde lo ofreces</Text>
                <Selector isDisabled={selectedDepartment === null} textColor={textColor} onChange={(val: SelectedValue) => { handleCity(val), setSelectedCity(val)}} value={selectedCity} list={cities} placeholder={"ciudad de..."}/>
            </View>
        </View>
    )
}