import { fetchProfile, signIn as SigninService, Signup } from '@/bff/auth';
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
  initializeAuth: () => Promise<void>;
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
  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        set({ 
          session, 
          user: session.user, 
          profile, 
          isLoading: false 
        });
      } else {
        set({ isLoading: false });
      }

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            const profile = await fetchProfile(session.user.id);
            set({ session, user: session.user, profile });
          } else if (event === 'SIGNED_OUT') {
            set({ session: null, user: null, profile: null });
          }
        }
      );

      // Cleanup subscription on unmount
      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ isLoading: false });
    }
  },
  signUp: async (userData) => {
    set({ isLoading: true, error: null });
    try {
        const { authData, profileData, error } = await Signup({userData});

        if(error) {
            set({ error: error.msg });
        }

        if (authData) {
            set({
            session: authData.session,
            profile: profileData,
            user: authData.user,
            isLoading: false,
            });
            router.push('/user');
        }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false });
      throw error;
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