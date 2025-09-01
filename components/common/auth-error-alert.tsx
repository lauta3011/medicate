import { AlertTriangle, X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface AuthErrorAlertProps {
  error: string | null;
  onDismiss?: () => void;
  variant?: 'error' | 'warning' | 'info';
}

export default function AuthErrorAlert({ 
  error, 
  onDismiss, 
  variant = 'error' 
}: AuthErrorAlertProps) {
  if (!error) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          container: 'bg-yellow-900/50 border-yellow-700',
          text: 'text-yellow-300',
          icon: '#fbbf24' // yellow-400
        };
      case 'info':
        return {
          container: 'bg-blue-900/50 border-blue-700',
          text: 'text-blue-300',
          icon: '#3b82f6' // blue-500
        };
      default:
        return {
          container: 'bg-red-900/50 border-red-700',
          text: 'text-red-300',
          icon: '#ef4444' // red-500
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <View className={`${styles.container} border rounded-lg p-4 mb-6`}>
      <View className="flex-row items-start">
        <AlertTriangle size={20} color={styles.icon} className="mr-3 mt-0.5" />
        <Text className={`${styles.text} flex-1 font-medium leading-5`}>
          {error}
        </Text>
        {onDismiss && (
          <Pressable onPress={onDismiss} className="ml-3 p-1">
            <X size={16} color={styles.icon} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

// Success alert component for positive feedback
interface AuthSuccessAlertProps {
  message: string | null;
  onDismiss?: () => void;
}

export function AuthSuccessAlert({ message, onDismiss }: AuthSuccessAlertProps) {
  if (!message) return null;

  return (
    <View className="bg-green-900/50 border border-green-700 rounded-lg p-4 mb-6">
      <View className="flex-row items-start">
        <View className="w-5 h-5 bg-green-500 rounded-full mr-3 mt-0.5 items-center justify-center">
          <Text className="text-green-900 text-xs font-bold">✓</Text>
        </View>
        <Text className="text-green-300 flex-1 font-medium leading-5">
          {message}
        </Text>
        {onDismiss && (
          <Pressable onPress={onDismiss} className="ml-3 p-1">
            <X size={16} color="#10b981" />
          </Pressable>
        )}
      </View>
    </View>
  );
}