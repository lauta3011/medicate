import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable } from "react-native";

interface RoundedBackButtonProps {
  onPress?: () => void;
  color?: string;
  size?: number;
}

export default function RoundedBackButton({ 
  onPress, 
  color = "#f8fafc",
  size = 24
}: RoundedBackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <Pressable 
      onPress={handlePress}
      className="w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-sm active:bg-slate-700/50 items-center justify-center"
    >
      <ArrowLeft size={size} color={color} />
    </Pressable>
  );
} 