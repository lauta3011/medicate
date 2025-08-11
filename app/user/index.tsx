import RoundedBackButton from "@/components/common/rounded-back-button";
import SafeAreaWrapper from "@/components/common/safe-area-wrapper";
import ServicesList from "@/components/common/service-list";
import { Heading } from "@/components/ui/heading";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { Button, ScrollView, Text, View } from "react-native";

export default function User() {
    const { profile, signOut } = useAuthStore()
    const router = useRouter();

    return (
        <SafeAreaWrapper className="flex-1 px-6">
            {/* Header */}
            <View className="flex-row items-center justify-between mt-16 mb-8">
                <Heading size="5xl" className="text-slate-50 mb-2">
                    {profile.name} <Text className="text-slate-300">{profile.last_name}</Text>
                </Heading>
                <RoundedBackButton />
            </View>

            <ScrollView className="flex-grow" showsVerticalScrollIndicator={false}>
                <View className="mb-6">
                    <Text className="text-slate-400 text-lg mb-2">Teléfono</Text>
                    <Text className="text-slate-50 text-xl">{profile.phone}</Text>
                </View>

                <View className="my-8">
                    <Text className="text-xl text-slate-50">una breve descripcion del servicio que se brinda desde el usuario que se loggeo </Text>
                </View>

                <ServicesList user={profile.id} />
            </ScrollView>
            
            <View className="py-2 gap-2">
                <Button title="agregar servicio" onPress={() => router.push('./user/new-service')}/>
                <Button title="cerrar sesión" onPress={signOut} color="#ef4444"/>
            </View>
        </SafeAreaWrapper>  
    )
}