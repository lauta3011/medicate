import { supabase } from "@/database";
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

async function uploadProfilePicture(imageUri: string, userId: string) {
  const fileExt = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
  const fileName = `profile-${userId}-${Date.now()}.${fileExt}`;
  
  const base64Data = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const { data, error } = await supabase.storage
    .from('profile-images/images')
    .upload(fileName, decode(base64Data), {
      contentType: `image/${fileExt === 'png' ? 'png' : 'jpeg'}`,
    });

  if (error) throw error;
  return data;
}

export const Signup = async ({ userData }: any) => {
    try {
        const { email, password, name, lastName, phone, profilePicture } = userData;
        
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });
    
        if (authError) {
            console.log('Auth signup error:', authError);
            throw authError;
        }

        if (!authData?.user) {
            throw new Error('No user data returned from signup');
        }

        let imagePath = null;
        if (profilePicture && authData.user.id) {
            try {
                const pictureData = await uploadProfilePicture(profilePicture, authData.user.id);
                imagePath = pictureData.path;
            } catch (uploadError) {
                console.log('Profile picture upload error (continuing without):', uploadError);
                // Continue without profile picture rather than failing completely
            }
        }
    
        const profileInsertData = {
            id: authData.user.id,
            email,
            name,
            last_name: lastName,
            phone,
            description: 'hardcoded aaaa',
            image_path: imagePath
        };

        const { data: profileData, error: profileError } = await supabase
            .from('profile')
            .insert(profileInsertData)
            .select();
    
        if (profileError) {
            console.log('Profile creation error:', profileError);
            throw profileError;
        }

        return { authData, profileData };
    } catch (error) {
        console.log('Signup error:', error);
        // Re-throw the error so it can be properly handled by the auth store
        throw error;
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
    
        if (error) throw error;
        if (!data.session) throw new Error('No session returned');
    
        return data;
    } catch (error) {
        console.log('SignIn error:', error);
        // Re-throw the error so it can be properly handled by the auth store
        throw error;
    }
}

export const fetchProfile = async (userId: string) => {
    try {
        const { data, error } = await supabase
          .from('profile')
          .select('*')
          .eq('id', userId)
          .single();
    
        if (error) throw error;
        return data;
    } catch (error) {
        console.log('error fetch profile ', error);
        throw error;
    }
  }

export const UpdateUserDescription = async (userId: string, description: string) => {
    try {
        const { data, error } = await supabase
            .from('profile')
            .update({ description })
            .eq('id', userId)
            .select('*')
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.log('error updating description ', error);
        return { error: { msg: 'Error al actualizar descripción' } };
    }
}

export const UpdateUserPhone = async (userId: string, phone: string) => {
    try {
        const { data, error } = await supabase
            .from('profile')
            .update({ phone })
            .eq('id', userId)
            .select('*')
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.log('error updating phone ', error);
        return { error: { msg: 'Error al actualizar teléfono' } };
    }
}