import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import {
    BookImage,
    Camera
} from "lucide-react-native";
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { Icon } from '../ui/icon';

export default function ImageSelector({ prevImage, handleImageChanged }: any) {
  const [image, setImage] = useState<string | null>(prevImage ?? null);
  
  // Check if running in Expo Go
  const isExpoGo = Constants.executionEnvironment === 'storeClient';

  useEffect(() => {
    handleImageChanged(image)
  }, [image]);

  const pickImage = async () => {
    if (isExpoGo) {
      Alert.alert(
        'Funcionalidad no disponible', 
        'La selección de imágenes no está disponible en Expo Go. Por favor, usa la versión de desarrollo de la app.'
      );
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Necesitamos acceso a tu galería para seleccionar imágenes');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (isExpoGo) {
      Alert.alert(
        'Funcionalidad no disponible', 
        'La cámara no está disponible en Expo Go. Por favor, usa la versión de desarrollo de la app.'
      );
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Necesitamos acceso a tu cámara para tomar fotos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  console.log('prev ', prevImage)
  console.log('image ', image)

  return (
    <View>
      {(image || prevImage) && (
        <Image source={{ uri: prevImage ?? image }} className="w-[200] h-[200] my-7 rounded-xl" />
      )}
      <View className="w-full flex-row justify-evenly">
        <Pressable 
          className={`border rounded-lg p-4 flex-row items-center ${
            isExpoGo ? 'border-slate-400 opacity-50' : 'border-slate-100'
          }`} 
          onPress={takePhoto}
          disabled={isExpoGo}
        >
          <Icon 
            className={`mx-2 ${isExpoGo ? 'text-slate-400' : 'text-slate-100'}`} 
            size='md' 
            as={Camera} 
          />
          <Text className={`text-xl ${isExpoGo ? 'text-slate-400' : 'text-slate-100'}`}>
            {isExpoGo ? 'No disponible' : 'Tomar foto'}
          </Text>
        </Pressable>
        <Pressable 
          className={`border rounded-lg p-4 flex-row items-center ${
            isExpoGo ? 'border-slate-400 opacity-50' : 'border-slate-100'
          }`} 
          onPress={pickImage}
          disabled={isExpoGo}
        >
          <Icon 
            className={`mx-2 ${isExpoGo ? 'text-slate-400' : 'text-slate-100'}`} 
            size='md' 
            as={BookImage} 
          />
          <Text className={`text-xl ${isExpoGo ? 'text-slate-400' : 'text-slate-100'}`}>
            {isExpoGo ? 'No disponible' : 'Elegir de galeria'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}