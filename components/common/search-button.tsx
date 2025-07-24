import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function BigButton({ redirectTo, primary, label }: any) {
    return (
        <Link href={redirectTo} asChild >
            <TouchableOpacity className={`${primary ? 'bg-slate-200' : ''} rounded-xl w-3/4 mt-10 py-3 px-8 drop-shadow-xl`}>
                <Text className={`${primary ? '' : 'color-slate-200'} text-2xl text-center`} >{label}</Text>
            </TouchableOpacity>
        </Link>
    )
}