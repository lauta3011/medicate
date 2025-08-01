import { FetchServicesOffers } from "@/bff/service";
import { create } from "zustand";

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
    }
}));