import { Text, View } from "react-native";

export default function NewServicePlaceholder() {
    return (
        <View className="flex-1">
            <View className="my-8 mx-2 border rounded-lg border-gray-400 flex-grow justify-center items-center">
                <Text className="color-gray-400 text-2xl">aun no ofreces ningun servicio</Text>
            </View>
        </View>
    )
}