import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Alert, ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../theme/ThemeContext";

export default function ProfesorDashboard() {
  const { colors } = useTheme();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [funcionCorrecta, setFuncionCorrecta] = useState("");

  const crearEjercicio = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    const response = await fetch(
      "https://mathoff-app.onrender.com/api/ejercicios/crear/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          funcion_correcta: funcionCorrecta,
        }),
      }
    );

    if (!response.ok) {
      Alert.alert("Error", "No se pudo crear");
      return;
    }

    Alert.alert("Éxito", "Ejercicio creado");
    setTitulo("");
    setDescripcion("");
    setFuncionCorrecta("");
  };

  return (
    <ScrollView 
    style={{ flex: 1, backgroundColor: colors.background }}
  contentContainerStyle={{ padding: 20 }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: colors.text }}>
        Panel de Profesor
      </Text>

      <TextInput
        placeholder="Título del ejercicio"
        placeholderTextColor={colors.textMuted}
        value={titulo}
        onChangeText={setTitulo}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          padding: 12,
          marginBottom: 15,
          borderRadius: 10,
          backgroundColor: colors.surface,
          color: colors.text,
        }}
      />

      <TextInput
        placeholder="Descripción"
        placeholderTextColor={colors.textMuted}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          padding: 12,
          marginBottom: 15,
          borderRadius: 10,
          minHeight: 100,
          backgroundColor: colors.surface,
          color: colors.text,
        }}
      />

      <TextInput
        placeholder="Función correcta"
        placeholderTextColor={colors.textMuted}
        value={funcionCorrecta}
        onChangeText={setFuncionCorrecta}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          padding: 12,
          marginBottom: 20,
          borderRadius: 10,
          backgroundColor: colors.surface,
          color: colors.text,
        }}
      />

      <TouchableOpacity
        onPress={crearEjercicio}
        style={{
          backgroundColor: colors.secondary,
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Crear Ejercicio
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}