import { ActivityIndicator, Text, View } from "react-native";

interface AuthLoadingProps {
  message?: string;
  size?: "small" | "large";
}

export default function AuthLoading({ 
  message = "Procesando...", 
  size = "large" 
}: AuthLoadingProps) {
  return (
    <View className="bg-slate-800/50 border border-slate-600 rounded-lg p-6 mb-6">
      <View className="flex-row items-center justify-center">
        <ActivityIndicator size={size} color="#3b82f6" className="mr-4" />
        <Text className="text-slate-300 font-medium text-lg">
          {message}
        </Text>
      </View>
    </View>
  );
}

// Inline loading for buttons
interface ButtonLoadingProps {
  isLoading: boolean;
  loadingText: string;
  normalText: string;
}

export function ButtonLoading({ isLoading, loadingText, normalText }: ButtonLoadingProps) {
  return (
    <View className="flex-row items-center justify-center">
      {isLoading && (
        <ActivityIndicator size="small" color="#1f2937" className="mr-2" />
      )}
      <Text className="text-slate-800 text-center font-semibold text-xl">
        {isLoading ? loadingText : normalText}
      </Text>
    </View>
  );
}