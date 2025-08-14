import { fetchCities, fetchDepartment, fetchServices } from "@/bff/fetch";
import SafeAreaWrapper from "@/components/common/safe-area-wrapper";
import Selector from "@/components/common/selector";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { useAuthStore } from "@/store/authStore";
import { useSearchedStore } from "@/store/searchedStore";
import { SelectedValue } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function FilterView() {
    const { getSearchedServices } = useSearchedStore();
    const { session } = useAuthStore();
    const [services, setServices] = useState<object[]>();
    const [departments, setDepartments] = useState<object[]>();
    const [cities, setCities] = useState<object[]>();

    const [selectedService, setSelectedService] = useState<SelectedValue>();
    const [selectedDepartment, setSelectedDepartment] = useState<SelectedValue>();
    const [selectedCity, setSelectedCity] = useState<SelectedValue | null>();
    
    const router = useRouter();

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

    function updateSearchedServices () {
        getSearchedServices({ city: selectedCity, department: selectedDepartment, service: selectedService })
        router.push('/searched');
    }

    function handleOfferService() {
        if (session) {
            // User is logged in, redirect to user dashboard
            router.push('/user');
        } else {
            // User is not logged in, redirect to login
            router.push('/login');
        }
    }

    return (
        <SafeAreaWrapper className="flex-1 justify-between px-6">
            {/* Header */}
            <View className="mt-16 mb-8">
                <Heading size="5xl" className="text-slate-50 mb-2">
                    Bienvenido a <Text className="text-slate-300">Conectate</Text>
                </Heading>
            </View>

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

            <Center className="gap-16 flex-1">
                {selectedCity && selectedDepartment && selectedService && 
                    <Pressable className="bg-slate-50 w-full p-3 rounded-md" onPress={() => updateSearchedServices()}>
                        <Text className="font-light text-3xl text-center text-slate-600">buscar</Text>
                    </Pressable>
                }
                <Pressable onPress={handleOfferService}>
                    <Text className="font-light text-3xl text-slate-50">ofrecer servicio</Text>
                </Pressable>
            </Center>
        </SafeAreaWrapper>
    )
}