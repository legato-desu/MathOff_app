const API_URL = "https://mathoff-app.onrender.com/api";

console.log("API:", API_URL);

// 🔐 LOGIN
import AsyncStorage from "@react-native-async-storage/async-storage";


export const loginRequest = async (
  username: string,
  password: string
) => {
  try {
    const response = await fetch(`${API_URL}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Error al iniciar sesión"
      );
    }

    // guardar tokens
    await AsyncStorage.setItem("accessToken", data.access);
    await AsyncStorage.setItem("refreshToken", data.refresh);

    return {
  token: data.access,
  refresh: data.refresh,
  user: {
    username: data.username,
    role: data.role,
  },
};

  } catch (error: any) {
    throw new Error(error.message);
  }
};

// 🟢 REGISTER
export const registerRequest = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;

  } catch (error: any) {
    console.log("ERROR REGISTER:", error);
    throw error;
  }
};

// 🔐 CAMBIAR CONTRASEÑA
export const changePasswordRequest = async (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const res = await fetch(`${API_URL}/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        currentPassword,
        newPassword
      })
    });

    const text = await res.text();
    console.log("RESPUESTA CRUDA CHANGE PASSWORD:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("El servidor no respondió JSON");
    }

    if (!res.ok) {
      throw new Error(data.message || "Error desconocido");
    }

    return data;

  } catch (error: any) {
    console.log("ERROR CHANGE PASSWORD:", error);
    throw error;
  }
};