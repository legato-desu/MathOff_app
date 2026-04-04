const API_URL = "http://192.168.2.187:3000/api"; // 🔥 TU IP REAL

// 🔑 LOGIN
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
      username: username, // 🔥 FORZADO
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
