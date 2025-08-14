import { fetchProfile, signIn as SigninService, Signup, UpdateUserDescription, UpdateUserPhone } from '@/bff/auth';
import { supabase } from '@/database';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import { create } from 'zustand';

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: any| null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: any) => void;
  signUp: (userData: object) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  updateDescription: (description: string) => Promise<void>;
  updatePhone: (phone: string) => Promise<void>;
  // initializeAuth: () => Promise<void>;
  signOut: () => Promise<void>;
}

const router = useRouter();

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  isLoading: false,
  error: null,
  setProfile: (profile) => set({ profile }),
  // initializeAuth: async () => {
  //   set({ isLoading: true });
  //   try {
  //     // Get initial session
  //     const { data: { session } } = await supabase.auth.getSession();
      
  //     if (session?.user) {
  //       const profile = await fetchProfile(session.user.id);
  //       set({ 
  //         session, 
  //         user: session.user, 
  //         profile, 
  //         isLoading: false 
  //       });
  //     } else {
  //       set({ isLoading: false });
  //     }

  //     // Listen for auth changes
  //     const { data: { subscription } } = supabase.auth.onAuthStateChange(
  //       async (event, session) => {
  //         if (event === 'SIGNED_IN' && session?.user) {
  //           const profile = await fetchProfile(session.user.id);
  //           set({ session, user: session.user, profile });
  //         } else if (event === 'SIGNED_OUT') {
  //           set({ session: null, user: null, profile: null });
  //         }
  //       }
  //     );

  //     // Cleanup subscription on unmount
  //     return () => subscription.unsubscribe();
  //   } catch (error) {
  //     console.error('Error initializing auth:', error);
  //     set({ isLoading: false });
  //   }
  // },
  signUp: async (userData) => {
    set({ isLoading: true, error: null });
    try {
        const result = await Signup({userData});

        if(result.error) {
            set({ error: result.error.msg, isLoading: false });
            return;
        }

        const { authData, profileData } = result;

        if (authData && authData.session) {
            set({
                session: authData.session,
                profile: profileData?.[0] || profileData, // Handle array response
                user: authData.user,
                isLoading: false,
            });
            router.push('/user');
        } else {
            set({ error: 'No se pudo crear la sesión', isLoading: false });
        }
    } catch (error) {
        set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false });
    }
  },
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
       const { session, user }: any = await SigninService(email, password);
      const profile = await fetchProfile(user.id);
      set({ session, user, profile, isLoading: false });
      router.push('/user');  
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error; 
    }
  },
  updateDescription: async (description: string) => {
    const { profile } = get();
    if (!profile?.id) return;
    
    set({ isLoading: true });
    try {
      const result = await UpdateUserDescription(profile.id, description);
      if (result.success) {
        set({ 
          profile: { ...profile, description },
          isLoading: false 
        });
      } else {
        console.error('Error updating description:', result.error);
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error updating description:', error);
      set({ isLoading: false });
    }
  },
  updatePhone: async (phone: string) => {
    const { profile } = get();
    if (!profile?.id) return;
    
    set({ isLoading: true });
    try {
      const result = await UpdateUserPhone(profile.id, phone);
      if (result.success) {
        set({ 
          profile: { ...profile, phone },
          isLoading: false 
        });
      } else {
        console.error('Error updating phone:', result.error);
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error updating phone:', error);
      set({ isLoading: false });
    }
  },
  signOut: async () => {
    set({ isLoading: true });
    try {
      await supabase.auth.signOut();
      set({ 
        session: null, 
        user: null, 
        profile: null, 
        isLoading: false 
      });
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
      set({ isLoading: false });
    }
  }
}));