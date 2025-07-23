import { create } from 'zustand';

interface RiderData {
  name: string;
  phone: string;
  vehicleType: string;
  aadhar: string;
}

interface AuthStore {
  riderData: RiderData | null;
  setRiderData: (data: RiderData) => void;
  clearRiderData: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  riderData: null,
  setRiderData: (data) => set({ riderData: data }),
  clearRiderData: () => set({ riderData: null }),
}));