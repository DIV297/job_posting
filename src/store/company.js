import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(persist(
  (set) => ({
    token: null,
    setToken: (newToken) => set({ token: newToken }),
    clearToken: () => set({ token: null }),
  }),
  {
    name: 'company-store', // Name of the item in the storage
    getStorage: () => localStorage, // Use localStorage for persistence
  }
));

export default useStore;
