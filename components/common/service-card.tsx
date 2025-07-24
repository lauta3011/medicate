import { Image, Text, View } from "react-native";
import { Card } from "../ui/card";
import { Center } from "../ui/center";
import { Heading } from "../ui/heading";

export default function ServiceCard({ offer }: any) {
    const { title, description, city, service, image_path } = offer;
    const { name: cityName } = city;
    const { name: serviceName } = service;
    
    return (
        <Card size="lg" variant="elevated" className="my-3">
            <Heading size="2xl">{title}</Heading>
            <View className="flex-row justify-between" >
                <Text className="text-xl">{cityName}</Text>
                <Text className="text-xl">{serviceName}</Text>
            </View>
            <View className="my-4 flex-col justify-center p-1 gap-6">
                <Text className="text-xl">{description}</Text>
                <Center>
                    <Image width={300} height={300} source={{ uri: `https://rmmhfwtstrhaovyddxvn.supabase.co/storage/v1/object/public/services-images/images/${image_path}` }} />
                </Center>
            </View>
        </Card>
    )
}