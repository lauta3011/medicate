import { supabase } from "@/database";

export const Signup = async ({ userData }: any) => {
    try {
        const { email, password, name, lastName, phone } = userData;
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });
    
        if (authError) throw authError;
    
        const { data: profileData, error: profileError } = await supabase
            .from('profile')
            .insert({
                id: authData?.user?.id,
                email,
                name,
                last_name: lastName,
                phone
            }).select();
    
        if (profileError) throw profileError

        return { authData, profileData };
    } catch (error) {
        console.log('error ', error)
        return { error: { msg: 'error en singup'} }
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
        console.log('error ', error)
        return error;
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
        console.log('error fetch profile ', error)
        throw error;
    }
  }