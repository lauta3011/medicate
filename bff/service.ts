import { supabase } from "@/database";
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

export const PostService = async ({ service_offer, service_location }: any) => {
    try {
        const {
            user,
            title,
            description,
            service,
            image,
        } = service_offer;


        const imagePath = await uploadImage(image, user);
        const { data, error } = await supabase
            .from('service_offer')
            .insert({
                title,
                description,
                user,
                image_path: imagePath.path,
                service: service.id
            }).select();

        if (error) {
            throw error;
        }

        if (data) {
            const { id } = data[0];
            await addServiceLocation(service_location, id);
        }

        return { success: true, error: false };
    } catch (error) {
        console.log('error! ', error);
        throw { error: { msg: 'error en add service' } }
    }
}

async function addServiceLocation(service_location: any[], service: any) {    
    try {
        let locations: any[] = [];
            
        service_location.map((loc: any, index: number) => {
            const { selectedCity } = loc;
            locations.push({ city_id: selectedCity.id, service_id: service });
        });

        const { error } = await supabase
        .from('service_location')
        .insert(locations).select();

        if (error) {
            throw error;
        }
    } catch (error) {
        throw error;
    }
}

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
        .select('title, description, user, image_path, service (id, name), service_location (service_id, city_id)')
        .eq('user', user);

    if (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
    else return {data, error }
}

export async function SearchedServices({searched}: any) {
    const { city, service } = searched;
    
    const { data, error } = await supabase
        .from('service_offer')
        .select(`
            service,
            title,
            description,
            image_path,
            service (id, name),
            service_location (service_id, city_id)
          `)
        .eq('service', service.id)
        .eq('service_location.city_id', city.id)
    if (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
    else return { data, error }
} 