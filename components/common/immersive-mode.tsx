import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function ImmersiveMode() {
  useEffect(() => {
    const enableImmersiveMode = async () => {
      try {
        if (Platform.OS === 'android') {
          // Try to hide system UI elements, but don't fail if it doesn't work in Expo Go
          await SystemUI.setBackgroundColorAsync('transparent');
          await SystemUI.setHiddenAsync(true);
        }
      } catch (error) {
        // In Expo Go, system UI hiding might not work, which is expected
        console.log('System UI hiding not available in Expo Go:', error);
      }
    };

    enableImmersiveMode();

    return () => {
      // Restore system UI when component unmounts
      try {
        if (Platform.OS === 'android') {
          SystemUI.setHiddenAsync(false);
        }
      } catch (error) {
        console.log('Error restoring system UI:', error);
      }
    };
  }, []);

  return null;
} 