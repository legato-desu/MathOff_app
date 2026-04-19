import { create } from "zustand";

interface AuthState {
  token: string | null;
  user: any;

  showLogin: boolean;

  login: (token: string, user: any) => void;
  logout: () => void;

  openLogin: () => void;
  closeLogin: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  showLogin: false,

  login: (token, user) =>
    set({ token, user, showLogin: false }),

  logout: () =>
    set({ token: null, user: null }),

  openLogin: () =>
    set({ showLogin: true }),

  closeLogin: () =>
    set({ showLogin: false }),
}));