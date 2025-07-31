import { create } from "zustand";

export const useNewServiceStore = create<any>((set) => ({
    serviceForm: {
        title: null,
        description: null,
        image: null,
        service: null,
        locations: []
    },
    modal: false,
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