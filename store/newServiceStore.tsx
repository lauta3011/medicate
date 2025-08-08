import { PostService } from "@/bff/service";
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
        const service_offer = get().serviceForm;
        const service_location = service_offer?.locations;
        
        const { title, description, image, service } = service_offer;
        
        if (title && description && image && service && service_location.length != 0) {
            set({ isLoading: true, error: null });
            
            try {
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
        set((state: any) => ({ serviceForm: { ...state.serviceForm, locations: [...state.serviceForm?.locations, location] } }))
}));