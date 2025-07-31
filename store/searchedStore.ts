import { SearchedServices } from "@/bff/service";
import { useRouter } from "expo-router";
import { create } from "zustand";

const router = useRouter();

export const useSearchedStore = create<any>((set, get) => ({
    isLoading: false,
    error: null,
    searched: { city: null, department: null, service: null },
    services: [ ],
    getSearchedServices: async (searched: any) => {
        const { data, error } = await SearchedServices({searched});

        if(error) {
            console.log('error ', error)
            throw error;
        }
        set({ services: data, searched: { city: searched.city.name, department: searched.department.name, service: searched.service.name } });
    }
}));