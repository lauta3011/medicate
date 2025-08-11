import { DeleteService, FetchServicesOffers, UpdateService } from "@/bff/service";
import { create } from "zustand";

export const useServiceStore = create<any>((set, get) => ({
    isLoading: false,
    error: null,
    myServices: [],
    getServices: async (user: any) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await FetchServicesOffers({user});
            set({ isLoading: false, error: null, myServices: data });
        } catch (error) {
            set({ isLoading: false, error });
            throw error
        }
    },
    deleteService: async (serviceId: any, user: any) => {
        set({ isLoading: true, error: null });
        try {
            await DeleteService({ serviceId });
            // Refresh the services list
            await get().getServices(user);
        } catch (error) {
            set({ isLoading: false, error });
            throw error
        }
    },
    updateService: async (serviceData: any, user: any) => {
        set({ isLoading: true, error: null });
        try {
            await UpdateService(serviceData);
            // Refresh the services list
            await get().getServices(user);
        } catch (error) {
            set({ isLoading: false, error });
            throw error
        }
    }
}));