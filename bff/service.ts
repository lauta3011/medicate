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

export const UpdateService = async ({ service_offer, service_location, serviceId }: any) => {
    try {
        console.log('UpdateService called with:', { service_offer, service_location, serviceId });
        
        const {
            user,
            title,
            description,
            service,
            image,
        } = service_offer;

        let updateData: any = {
            title,
            description,
            service: service.id
        };

        console.log('Update data:', updateData);

        // Only upload new image if provided
        if (image && image !== 'existing') {
            console.log('Uploading new image...');
            const imagePath = await uploadImage(image, user);
            updateData.image_path = imagePath.path;
        }

        const { data, error } = await supabase
            .from('service_offer')
            .update(updateData)
            .eq('id', serviceId)
            .select();

        if (error) {
            console.error('Error updating service_offer:', error);
            throw error;
        }

        console.log('Service updated successfully:', data);

        // Update service locations if provided
        if (service_location && service_location.length > 0) {
            console.log('Updating service locations...');
            await updateServiceLocation(service_location, serviceId);
        }

        return { success: true, error: false };
    } catch (error) {
        console.error('Error in UpdateService:', error);
        throw { error: { msg: 'error en update service' } }
    }
}

export const DeleteService = async ({ serviceId }: any) => {
    try {
        // First delete service locations
        const { error: locationError } = await supabase
            .from('service_location')
            .delete()
            .eq('service_id', serviceId);

        if (locationError) {
            throw locationError;
        }

        // Then delete the service offer
        const { error } = await supabase
            .from('service_offer')
            .delete()
            .eq('id', serviceId);

        if (error) {
            throw error;
        }

        return { success: true, error: false };
    } catch (error) {
        console.log('error! ', error);
        throw { error: { msg: 'error en delete service' } }
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

async function updateServiceLocation(service_location: any[], serviceId: any) {    
    try {
        console.log('updateServiceLocation called with:', { service_location, serviceId });
        
        if (!service_location || service_location.length === 0) {
            console.log('No service locations to update');
            return;
        }

        // First delete existing locations
        const { error: deleteError } = await supabase
            .from('service_location')
            .delete()
            .eq('service_id', serviceId);

        if (deleteError) {
            console.error('Error deleting existing locations:', deleteError);
            throw deleteError;
        }

        // Then add new locations
        let locations: any[] = [];
            
        service_location.forEach((loc: any, index: number) => {
            if (loc && loc.selectedCity) {
                locations.push({ city_id: loc.selectedCity.id, service_id: serviceId });
            }
        });

        console.log('New locations to insert:', locations);

        if (locations.length > 0) {
            const { error } = await supabase
                .from('service_location')
                .insert(locations)
                .select();

            if (error) {
                console.error('Error inserting new locations:', error);
                throw error;
            }
        }
    } catch (error) {
        console.error('Error in updateServiceLocation:', error);
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
        .select(`
            id, 
            title, 
            description, 
            user, 
            image_path, 
            service (id, name), 
            service_location (
                service_id, 
                city_id,
                city (id, name, from_department (id, name))
            ),
            user (name, last_name, phone, image_path)
        `)
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
            id,
            service,
            title,
            description,
            image_path,
            user,
            service (id, name),
            service_location (service_id, city_id),
            user (name, last_name, phone, image_path)
          `)
        .eq('service', service.id)
        .eq('service_location.city_id', city.id)
    if (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
    else return { data, error }
} 