import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Alert, ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../theme/ThemeContext";

export default function EstudianteDashboard() {
  const { colors } = useTheme();

  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [respuestas, setRespuestas] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    cargarEjercicios();
  }, []);

  const cargarEjercicios = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    const response = await fetch(
      "https://mathoff-app.onrender.com/api/ejercicios/",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      
    );

    const data = await response.json();
    setEjercicios(data);
  };

  const enviarRespuesta = (id: number) => {
    if (!respuestas[id]) {
      Alert.alert("Error", "Escribe una respuesta");
      return;
    }

    Alert.alert("Respuesta enviada");
    setRespuestas((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <ScrollView 
    style={{ flex: 1, backgroundColor: colors.background }}
    contentContainerStyle={{ padding: 20, backgroundColor: colors.background }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20, color: colors.text }}>
        Panel de Estudiante
      </Text>

      {ejercicios.map((item) => (
        <View
          key={item.id}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 14,
            padding: 16,
            marginBottom: 20,
            backgroundColor: colors.card,
          }}
        >
          {ejercicios.length === 0 && (
  <Text style={{ color: colors.textMuted }}>
    No hay ejercicios disponibles
  </Text>
)}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: colors.text }}>
            {item.titulo}
          </Text>

          <Text style={{ marginBottom: 15, color: colors.textSecondary }}>
            {item.descripcion}
          </Text>

          <TextInput
            placeholder="Escribe tu respuesta"
            placeholderTextColor={colors.textMuted}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 10,
              padding: 12,
              marginBottom: 12,
              backgroundColor: colors.surface,
              color: colors.text,
            }}
          />

          <TouchableOpacity
            onPress={() => enviarRespuesta(item.id)}
            style={{
              backgroundColor: colors.primary,
              padding: 14,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Enviar Respuesta
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}