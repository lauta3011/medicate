import { useRouter } from "expo-router";
import { create } from "zustand";

const router = useRouter();

export const useSearchedStore = create<any>((set, get) => ({
    isLoading: false,
    error: null,
    searched: { city: null, department: null, service: null },
    services: [ ],
    setSearched: (city: string, department: string, service: string) => {
        set({ searched: { city: city, department: department, service: service } });
    },
    getSearchedServices: () => {

    }
}));