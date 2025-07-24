import { supabase } from "@/database";

export const PostService = async ({ service_offer }: any) => {
    try {
        const {
            user,
            title,
            description,
            city,
            department,
            service,
            image
        } = service_offer;

        const imagePath = await uploadImage(image, user);
        const { data, error } = await supabase
            .from('service_offer')
            .insert({
                title,
                description,
                user,
                image_path: imagePath.path,
                city,
                department,
                service
            }).select();

        if (error) {
            throw error;
        }

        return { data, error };
    } catch (error) {
        console.log('error! ', error);
        throw { error: { msg: 'error en add service' } }
    }
}

import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

async function uploadImage(imageUri: string, userId: string) {
  const fileExt = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  
  const base64Data = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const { data, error } = await supabase.storage
    .from('services-images/images')
    .upload(fileName, decode(base64Data), {
      contentType: `image/${fileExt === 'png' ? 'png' : 'jpeg'}`,
    });

  if (error) throw error;
  return data;
}

export const FetchServicesOffers = async ({ user }: any) => {
    const { data, error } = await supabase
        .from('service_offer')
        .select('title, description, image_path, city (id, name), service (id, name)')
        .eq('user', user);

    if (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
    else return {data, error }
}

export async function SearchedServices({searched}: any) {
    console.log(searched);
} 