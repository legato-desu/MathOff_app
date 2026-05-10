import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../theme/ThemeContext";

export default function EstudianteDashboard() {
  const { colors } = useTheme();

  const [ejercicios, setEjercicios] = useState<any[]>([]);

  const [respuestas, setRespuestas] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    cargarEjercicios();
  }, []);

  const cargarEjercicios = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      const response = await fetch(
        "https://mathoff-app.onrender.com/api/ejercicios/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setEjercicios(data);

    } catch (error) {
      console.log("ERROR EJERCICIOS:", error);

      Alert.alert(
        "Error",
        "No se pudieron cargar los ejercicios"
      );
    }
  };

  const enviarRespuesta = async (item: any) => {
  try {

    const respuestaUsuario =
      respuestas[item.id];

    if (
      !respuestaUsuario ||
      respuestaUsuario.trim() === ""
    ) {

      Alert.alert(
        "Error",
        "Escribe una respuesta"
      );

      return;
    }

    const token =
      await AsyncStorage.getItem(
        "accessToken"
      );

    const response = await fetch(
      "https://mathoff-app.onrender.com/api/respuestas/crear/",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          ejercicio: item.id,
          respuesta_usuario:
            respuestaUsuario,
        }),
      }
    );

    const data = await response.json();

    console.log(
      "RESPUESTA BACKEND:",
      data
    );

    if (!response.ok) {

      Alert.alert(
        "Error",
        "No se pudo enviar respuesta"
      );

      return;
    }

    // VALIDACIÓN
    if (data.es_correcta) {

      Alert.alert(
        "Correcto ✅",
        "La respuesta es correcta"
      );

    } else {

      Alert.alert(
        "Incorrecto ❌",
        "La respuesta es incorrecta"
      );
    }

    // LIMPIAR INPUT
    setRespuestas((prev) => ({
      ...prev,
      [item.id]: "",
    }));

    // ELIMINAR EJERCICIO RESPONDIDO
    setEjercicios((prev) =>
      prev.filter(
        (ejercicio) =>
          ejercicio.id !== item.id
      )
    );

  } catch (error) {

    console.log(
      "ERROR ENVIANDO RESPUESTA:",
      error
    );

    Alert.alert(
      "Error",
      "Ocurrió un problema"
    );
  }
};

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          colors.background,
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 20,
          color: colors.text,
        }}
      >
        Panel de Estudiante
      </Text>

      {ejercicios.length === 0 && (
        <Text
          style={{
            color: colors.textMuted,
          }}
        >
          No hay ejercicios disponibles
        </Text>
      )}

      {ejercicios.map((item) => (
        <View
          key={item.id}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 14,
            padding: 16,
            marginBottom: 20,
            backgroundColor:
              colors.card,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              color: colors.text,
            }}
          >
            {item.titulo}
          </Text>

          <Text
            style={{
              marginBottom: 15,
              color:
                colors.textSecondary,
            }}
          >
            {item.descripcion}
          </Text>

          <TextInput
            placeholder="Escribe tu respuesta"
            placeholderTextColor={
              colors.textMuted
            }
            value={
              respuestas[item.id] || ""
            }
            onChangeText={(text) =>
              setRespuestas((prev) => ({
                ...prev,
                [item.id]: text,
              }))
            }
            style={{
              borderWidth: 1,
              borderColor:
                colors.border,
              borderRadius: 10,
              padding: 12,
              marginBottom: 12,
              backgroundColor:
                colors.surface,
              color: colors.text,
            }}
          />

          <TouchableOpacity
            onPress={() =>
              enviarRespuesta(item)
            }
            style={{
              backgroundColor:
                colors.primary,
              padding: 14,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Enviar Respuesta
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}