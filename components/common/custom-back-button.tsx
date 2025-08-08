import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, Text } from "react-native";

interface CustomBackButtonProps {
  onPress?: () => void;
  title?: string;
  color?: string;
  route?: any; // Using any to avoid complex Expo Router typing issues
}

export default function CustomBackButton({ 
  onPress, 
  title = "Volver", 
  color = "#f8fafc",
  route
}: CustomBackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (route) {
      router.push(route);
    } else {
      router.back();
    }
  };

  return (
    <Pressable 
      onPress={handlePress}
      className="flex-row items-center gap-2 py-3 px-4 rounded-lg bg-slate-800/50 backdrop-blur-sm active:bg-slate-700/50"
      style={{ minWidth: 100 }}
    >
      <ArrowLeft size={20} color={color} />
      <Text className="text-slate-50 font-medium">{title}</Text>
    </Pressable>
  );
} 