import { fetchServices } from "@/bff/fetch";
import { useNewServiceStore } from "@/store/newServiceStore";
import { SelectedValue } from "@/types";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Input, InputField } from "../ui/input";
import ImageSelector from "./image-selector";
import Selector from "./selector";

export default function ServiceBasicInfo() {
    const { title, description, image, service, serviceForm } = useNewServiceStore();
    const [services, setServices] = useState<object[] | null>(null);

    useEffect(() => {
        async function fetchData() {
            const services: any = await fetchServices();
            setServices(services);
        } 

        fetchData();
    }, []);
    

    return (
        <View>
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
                        <InputField onChangeText={(text: string) => title(text)} value={title} placeholder="titulo de la publicacion" />
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
                        <InputField onChangeText={(text: string) => description(text)} value={description} placeholder="descripcion de lo que ofreces" />
                    </Input>
                </View>

                <View className="my-4 gap-2">
                    <Text className="text-slate-50 text-2xl font-light">elige que foto se mostrara junto con la oferta de tu trabajo.</Text>
                    <ImageSelector handleImageChanged={(img: any) => image(img)}/>
                </View>

                <View className="my-4 gap-2">
                    <Text className="text-slate-50 text-2xl font-light">selecciona que tipo de servicio es el que ofreces</Text>
                    <Selector onChange={(val: SelectedValue) => service(val)} value={serviceForm.service} list={services} placeholder={"ofrezco servicios de ..."} />
                </View>
        </View>
    )
}