import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store/authStore";

const API_URL = "https://mathoff-app.onrender.com/api";

export const loginRequest = async (
  username: string,
  password: string
) => {

  try {

    const response = await fetch(
      `${API_URL}/token/`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    console.log("LOGIN RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data.detail || "Error al iniciar sesión"
      );
    }

    await AsyncStorage.setItem(
      "accessToken",
      data.access
    );

    await AsyncStorage.setItem(
      "refreshToken",
      data.refresh
    );

    return {

      token: data.access,

      refresh: data.refresh,

      user: {
        username: data.username,
        email: data.email,
        role: data.role,
        user_id: data.user_id,
      },
    };

  } catch (error: any) {

    console.log("ERROR LOGIN:", error);
    throw new Error(error.message);
  }
};



export const refreshAccessToken = async () => {

  try {

    const refreshToken =
      await AsyncStorage.getItem("refreshToken");

    if (!refreshToken) {
      return null;
    }

    const response = await fetch(
      `${API_URL}/token/refresh/`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    await AsyncStorage.setItem(
      "accessToken",
      data.access
    );

    return data.access;

  } catch (error) {

    console.log("ERROR REFRESH TOKEN:", error);
    return null;
  }
};


export const authFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {

  let token =
    await AsyncStorage.getItem("accessToken");

  let response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,

        ...(options.headers || {}),
      },
    }
  );

  if (response.status === 401) {

    console.log(
      "TOKEN EXPIRADO → intentando refresh..."
    );

    const newAccessToken =
      await refreshAccessToken();

    if (newAccessToken) {

      response = await fetch(
        `${API_URL}${endpoint}`,
        {
          ...options,

          headers: {
            "Content-Type": "application/json",

            Authorization:
              `Bearer ${newAccessToken}`,

            ...(options.headers || {}),
          },
        }
      );

      return response;
    }

    const logout =
      useAuthStore.getState().logout;

    await logout();

    throw new Error(
      "Sesión expirada. Inicia sesión nuevamente."
    );
  }

  if (response.status === 403) {

    throw new Error(
      "No tienes permisos para acceder."
    );
  }

  return response;
};


export const registerRequest = async (
  username: string,
  email: string,
  password: string
) => {

  try {

    const response = await fetch(
      `${API_URL}/register/`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {

      throw new Error(
        data.detail || "Error en registro"
      );
    }

    return data;

  } catch (error: any) {

    console.log("ERROR REGISTER:", error);
    throw new Error(error.message);
  }
};

export const changePasswordRequest = async (
  currentPassword: string,
  newPassword: string
) => {

  try {

    const response = await authFetch(
      "/users/change-password/",
      {
        method: "POST",

        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      }
    );

    const data = await response.json();

    console.log(
      "CHANGE PASSWORD RESPONSE:",
      data
    );

    if (!response.ok) {

      throw new Error(
        data.detail ||
        "Error cambiando contraseña"
      );
    }

    return data;

  } catch (error: any) {

    console.log(
      "ERROR CHANGE PASSWORD:",
      error
    );

    throw new Error(error.message);
  }
};