import { create } from "zustand";

interface ScanImage {
  id: string;
  uri: string;
}

interface ScanStore {
  images: ScanImage[];
  addImage: (uri: string) => void;
}

export const useScanStore = create<ScanStore>((set) => ({
  images: [],

  addImage: (uri) =>
    set((state) => ({
      images: [
        {
          id: Date.now().toString(),
          uri,
        },
        ...state.images,
      ],
    })),
}));