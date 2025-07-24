import ServicesList from "@/components/common/service-list";
import { Heading } from "@/components/ui/heading";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function User() {
    const { profile } = useAuthStore()
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1">
            <ScrollView className="flex-grow">
                <Heading size="3xl" className="text-slate-50">{profile.name} {profile.last_name}</Heading>
                <Heading size="xl" className="text-slate-50 font-light"><Text className="font-normal">Tel: </Text>{profile.phone}</Heading>

                <View className="my-8">
                    <Text className="text-xl text-slate-50">una breve descripcion del servicio que se brinda desde el usuario que se loggeo </Text>
                </View>

                <ServicesList user={profile.id} />
            </ScrollView>
            <View className="py-2">
                <Button title="agregar servicio" onPress={() => router.push('/services/new-service')}/>
            </View>
        </SafeAreaView>  
    )
}