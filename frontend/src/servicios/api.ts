import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://mathoff-app.onrender.com/api";

console.log("API:", API_URL);

//
// 🔐 LOGIN
//
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

    console.log("LOGIN RESPONSE:", data);

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
    console.log("ERROR LOGIN:", error);
    throw new Error(error.message);
  }
};

//
// 🟢 REGISTER
//
export const registerRequest = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(
      `${API_URL}/users/register/`,
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

    console.log("REGISTER RESPONSE:", data);

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

//
// 🔐 CAMBIAR CONTRASEÑA
//
export const changePasswordRequest = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    const response = await fetch(
      `${API_URL}/users/change-password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      }
    );

    const data = await response.json();

    console.log("CHANGE PASSWORD RESPONSE:", data);

    if (!response.ok) {
        throw new Error(
          data.detail || "Error cambiando contraseña"
        );
    }

    return data;

  } catch (error: any) {
    console.log("ERROR CHANGE PASSWORD:", error);
    throw new Error(error.message);
  }
};