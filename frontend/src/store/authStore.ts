import { create } from "zustand";

interface UserData {
  username: string;
  role: string | null;
}

interface AuthState {
  token: string | null;
  user: UserData | null;

  showLogin: boolean;

  login: (token: string, user: UserData) => void;
  logout: () => void;

  openLogin: () => void;
  closeLogin: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  showLogin: false,

  login: (token, user) =>
    set({
      token,
      user,
      showLogin: false,
    }),

  logout: () =>
    set({
      token: null,
      user: null,
    }),

  openLogin: () =>
    set({
      showLogin: true,
    }),

  closeLogin: () =>
    set({
      showLogin: false,
    }),
}));