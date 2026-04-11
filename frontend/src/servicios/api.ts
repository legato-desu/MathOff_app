const API_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("ENV:", process.env);
console.log("API:", process.env.EXPO_PUBLIC_API_URL);

export const loginRequest = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const text = await response.text();
    console.log("RESPUESTA BACKEND:", text);

    const data = JSON.parse(text);

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;

  } catch (error: any) {
  console.log("ERROR COMPLETO:", error);
  throw error;
}
  
};

export const registerRequest = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};


export const changePasswordRequest = async (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {

  try {

    const res = await fetch(`${API_URL}/auth/change-password`, {
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
      throw new Error("El servidor no respondió JSON (ruta incorrecta o error backend)");
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