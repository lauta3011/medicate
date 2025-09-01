import { PostService } from "@/bff/service";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { create } from "zustand";

const router = useRouter();

export const useNewServiceStore = create<any>((set, get) => ({
    serviceForm: {
        title: null,
        description: null,
        image: null,
        service: null,
        locations: []
    },
    isLoading: false,
    modal: false,
    addService: async () => {
        const serviceForm = get().serviceForm;
        const service_location = serviceForm?.locations;
        
        const { title, description, image, service } = serviceForm;
        
        if (title && description && image && service && service_location.length != 0) {
            set({ isLoading: true, error: null });
            
            try {
                // Get current user ID from auth store
                const { profile } = useAuthStore.getState();
                
                // Create service_offer with user ID
                const service_offer = {
                    ...serviceForm,
                    user: profile?.id
                };
                
                const { success, error } = await PostService({ service_offer, service_location });
    
                if (error) {
                    set({ isLoading: false, error: true });
                    return 
                }
    
                if (success) {
                    set({ isLoading: false, error: false });
                    router.push('/user');
                }
            } catch (error) {
                set({ error: error instanceof Error ? error.message : 'Error desconocido', isLoading: false });
                throw error;
            } finally {
                set({ isLoading: false });
            }
        }
    },
    locationModal: () => (set((state: any) => ({ modal: !state.modal }))),
    title: (title: string) => set((state: any) => ({ serviceForm: { ...state.serviceForm, title: title } })),
    description: (description: string) => 
        set((state: any) => ({ serviceForm: { ...state.serviceForm, description: description } })),
    image: (image: string) => 
        set((state: any) => ({ serviceForm: { ...state.serviceForm, image: image } })),
    service: (service: string) => 
        set((state: any) => ({ serviceForm: { ...state.serviceForm, service: service } })),
    addLocation: (location: any) => 
        set((state: any) => {
            // Check for duplicates - compare by city ID
            const existingLocations = state.serviceForm?.locations || [];
            const isDuplicate = existingLocations.some((existing: any) => 
                existing.selectedCity?.id === location.selectedCity?.id
            );
            
            if (isDuplicate) {
                return state; // Don't add duplicate
            }
            
            return { serviceForm: { ...state.serviceForm, locations: [...existingLocations, location] } };
        }),
    removeLocation: (index: number) => 
        set((state: any) => {
            const locations = [...(state.serviceForm?.locations || [])];
            locations.splice(index, 1);
            return { serviceForm: { ...state.serviceForm, locations } };
        }),
    setLocations: (locations: any[]) => 
        set((state: any) => ({ serviceForm: { ...state.serviceForm, locations: locations } }))
}));