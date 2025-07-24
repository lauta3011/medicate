import { fetchCities, fetchDepartment, fetchServices } from "@/bff/fetch";
import { useAuthStore } from "@/store/authStore";
import { useServiceStore } from "@/store/serviceStore";
import { SelectedValue } from "@/types";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { Heading } from "../ui/heading";
import { Input, InputField } from "../ui/input";
import ImageSelector from "./image-selector";
import Selector from "./selector";

export default function ServiceForm() {
    const { profile } = useAuthStore();
    const { addService } = useServiceStore();
    const [services, setServices] = useState<object[] | null>(null);
    const [departments, setDepartments] = useState<object[] | null>(null);
    const [cities, setCities] = useState<object[] | null>(null);

    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [selectedService, setSelectedService] = useState<SelectedValue>();
    const [selectedDepartment, setSelectedDepartment] = useState<SelectedValue>();
    const [selectedCity, setSelectedCity] = useState<SelectedValue | null>();
    const [selectedImage, setSelectedImage] = useState<string | null>();

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
            setCities(cities!);
        }

        if(!departments) {
            fetchInitialData();
            return;
        }

        updateCities();
    }, [selectedDepartment])  
    
    function handleAddService() {
        const { id: user } = profile;
        if (title && description && selectedCity && selectedDepartment && selectedService) {
            
            const city = selectedCity.id;
            const department = selectedDepartment.id;
            const service = selectedService.id;
            
            const offer = {
                user,
                title,
                description,
                city,
                department,
                service,
                image: selectedImage 
            }
            addService(offer);
        }
    }

    return (
        <View className="flex-1">
            <ScrollView className="flex-grow">
                <Heading size="3xl" className="text-slate-50 mb-8">Nuevo servicio</Heading>
                <View className="my-4 gap-2">
                    <Text className="text-slate-50 text-2xl font-light">el titulo a mostrar en la publicacion del servicio que ofreces</Text>
                    <Input
                        className="bg-slate-50 mb-3"
                        variant="outline"
                        size="lg"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                    >
                        <InputField onChangeText={(text: string) => setTitle(text)} value={title} placeholder="titulo de la publicacion" />
                    </Input>
                </View>

                <View className="my-4 gap-2">
                    <Text className="text-slate-50 text-2xl font-light">desripcion del trabajo que realizas, como lo haces y como pretendes cobrar por tus servicios</Text>
                    <Input
                        className="bg-slate-50 mb-3"
                        variant="outline"
                        size="lg"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                    >
                        <InputField onChangeText={(text: string) => setDescription(text)} value={description} placeholder="descripcion de lo que ofreces" />
                    </Input>
                </View>

                <View className="my-4 gap-2">
                    <Text className="text-slate-50 text-2xl font-light">elige que foto se mostrara junto con la oferta de tu trabajo.</Text>
                    <ImageSelector handleImageChanged={(image: any) => setSelectedImage(image)}/>
                </View>

                <View className="my-4 gap-2">
                    <Text className="text-slate-50 text-2xl font-light">selecciona que tipo de servicio es el que ofreces</Text>
                    <Selector onChange={(val: SelectedValue) => setSelectedService(val)} value={selectedService} list={services} placeholder={"ofrezco servicios de ..."} />
                </View>

                <View className="my-4 gap-2">
                    <Text className="text-slate-50 text-2xl font-light">en que departamento te encuentras</Text>
                    <Selector onChange={(val: SelectedValue) => setSelectedDepartment(val)} value={selectedDepartment} list={departments} placeholder={"departamento de..."} />
                </View>

                {cities && <View className="my-4 gap-2">
                    <Text className="text-slate-50 text-2xl font-light">y la ciudad donde lo ofreces</Text>
                    <Selector onChange={(val: SelectedValue) => setSelectedCity(val)} value={selectedCity} list={cities} placeholder={"ciudad de..."}/>
                </View>}
            </ScrollView>

            <View className="py-2">
                <Button title="AGREGAR" onPress={() => handleAddService()} />
            </View>
        </View>
    )
}