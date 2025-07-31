import * as ImagePicker from 'expo-image-picker';
import {
  BookImage,
  Camera
} from "lucide-react-native";
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { Icon } from '../ui/icon';
export default function ImageSelector({ handleImageChanged }: any) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    handleImageChanged(image)
  }, [image]);

  const pickImage = async () => {
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

  return (
    <View>
      {image && (
        <Image source={{ uri: image }} className="w-[200] h-[200] my-7 rounded-xl" />
      )}
      <View className="w-full flex-row justify-evenly">
        <Pressable className="border-slate-100 border rounded-lg p-4 flex-row items-center" onPress={takePhoto}>
          <Icon className="text-slate-100 mx-2" size='md' as={Camera} />
          <Text className='text-slate-100 text-xl'>Tomar foto</Text>
        </Pressable>
        <Pressable className="border-slate-100 border rounded-lg p-4 flex-row items-center" onPress={pickImage}>
          <Icon className='text-slate-100 mx-2' size='md' as={BookImage} />
          <Text className='text-slate-100 text-xl'>Elegir de galeria</Text>
        </Pressable>
      </View>
    </View>
  );
}