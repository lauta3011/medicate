import { fetchCities, fetchDepartment, fetchServices } from "@/bff/fetch";
import BigButton from "@/components/common/search-button";
import Selector from "@/components/common/selector";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { SelectedValue } from "@/types";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function MainView() {
    const [services, setServices] = useState<object[]>();
    const [departments, setDepartments] = useState<object[]>();
    const [cities, setCities] = useState<object[]>();

    const [selectedService, setSelectedService] = useState<SelectedValue>();
    const [selectedDepartment, setSelectedDepartment] = useState<SelectedValue>();
    const [selectedCity, setSelectedCity] = useState<SelectedValue | null>();
    
    useEffect(() => {
        async function fetchInitialData() {
            const department: any = await fetchDepartment();
            const services: any = await fetchServices();
            setDepartments(department);
            setServices(services);
        }
        
        async function updateCities() {
            const cities = await fetchCities(selectedDepartment!);
            setSelectedCity(null);
            setCities(cities);
        }

        if(!departments) {
            fetchInitialData();
            return;
        }

        updateCities();
    }, [selectedDepartment])  

    return (
        <SafeAreaView className="flex-1 justify-between">

            <Center>
                <Heading size="5xl" className="text-slate-50 mb-16">Bienvenido a <Text className="text-slate-300">Conectate</Text></Heading>
            </Center>

            <View className="my-10 gap-3">
                <Text className="font-light text-3xl text-slate-50">{"¿que servicio estas buscando?"}</Text>
                <Selector list={services} placeholder={"estoy buscando un..."} onChange={(srv: SelectedValue) => setSelectedService(srv)} value={selectedService} />
            </View>

            <View className="my-10 gap-3">
                <Text className="font-light text-3xl text-slate-50">{"¿donde queres encontrarlo?"}</Text>
                <Selector list={departments} onChange={(dpt: SelectedValue) => setSelectedDepartment(dpt)} value={selectedDepartment} placeholder="en el departamento de..." />
            </View>

            {selectedDepartment &&
                <View className="my-10 gap-3">
                    <Text className="font-light text-3xl text-slate-50">{"ciudad de..."}</Text>
                    <Selector placeholder="..." onChange={(city: SelectedValue) => setSelectedCity(city)} value={selectedCity} list={cities} />
                </View> 
            }

            <Center className="flex-1">
                {selectedCity && selectedDepartment && selectedService && 
                    <BigButton onPress={() => console.log('pasa algo ? ')} redirectTo={`/searched`} primary={true} label="buscar" />
                }
                <BigButton primary={false} redirectTo={`/user/login`} label="ofrecer servicio" />
            </Center>
        </SafeAreaView>
    )
}