import { FetchServicesOffers, PostService } from "@/bff/service";
import { useRouter } from "expo-router";
import { create } from "zustand";

const router = useRouter();

export const useServiceStore = create<any>((set) => ({
    isLoading: false,
    error: null,
    myServices: [],
    getServices: async (user: any) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await FetchServicesOffers({user});
            set({ isLoading: false, error: null, myServices: data });
        } catch (error) {
            throw error
        }
    },
    addService: async (service_offer: any) => {
        set({ isLoading: true, error: null });
        try {
            const { data, error } = await PostService({ service_offer });

            if (error) {
                set({ isLoading: false, error: true });
                return 
            }

            if (data) {
                set({ isLoading: false, error: null });
                router.push('/user');
            }
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false });
            throw error;
        } finally {
            set({ isLoading: false, error: null });
        }
    }
}));