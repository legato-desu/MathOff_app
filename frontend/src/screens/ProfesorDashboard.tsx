import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfesorDashboard() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [funcionCorrecta, setFuncionCorrecta] = useState("");

  const crearEjercicio = async () => {
  console.log("🔥 BOTÓN PRESIONADO");

  try {
    const token = await AsyncStorage.getItem("accessToken");

    console.log("TOKEN:", token);

    const response = await fetch(
      "http://127.0.0.1:8000/api/ejercicios/crear/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          funcion_correcta: funcionCorrecta,
        }),
      }
    );

    console.log("RESPONSE STATUS:", response.status);

    const data = await response.json();

    console.log("DATA:", data);

    if (!response.ok) {
      throw new Error("No se pudo crear el ejercicio");
    }

    Alert.alert("Éxito", "Ejercicio creado correctamente");

    setTitulo("");
    setDescripcion("");
    setFuncionCorrecta("");

  } catch (error: any) {
    console.log("ERROR:", error);
    Alert.alert("Error", error.message);
  }
};

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Panel de Profesor
      </Text>

      <TextInput
        placeholder="Título del ejercicio"
        value={titulo}
        onChangeText={setTitulo}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
          borderRadius: 10,
        }}
      />

      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 15,
          borderRadius: 10,
          minHeight: 100,
        }}
      />

      <TextInput
        placeholder="Función correcta (ej: y = x^2 + 2x + 1)"
        value={funcionCorrecta}
        onChangeText={setFuncionCorrecta}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
          borderRadius: 10,
        }}
      />

      <TouchableOpacity
        onPress={crearEjercicio}
        style={{
          backgroundColor: "#2E7D32",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Crear Ejercicio
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}