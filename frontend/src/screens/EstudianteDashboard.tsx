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

export default function EstudianteDashboard() {
  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [respuesta, setRespuesta] = useState("");

  useEffect(() => {
    cargarEjercicios();
  }, []);

  const cargarEjercicios = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      console.log("TOKEN:", token);

      const response = await fetch(
        "https://mathoff-app.onrender.com/api/ejercicios/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // TEMPORAL DEBUG
      const text = await response.text();
      console.log("RESPUESTA BACKEND:", text);

      // IMPORTANTE:
      // NO usamos response.json() aquí todavía,
      // porque primero queremos ver qué devuelve Django

    } catch (error) {
      console.log("ERROR CARGAR EJERCICIOS:", error);
    }
  };

  const enviarRespuesta = async (ejercicioId: number) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      console.log("TOKEN RESPUESTA:", token);

      const response = await fetch(
        "https://mathoff-app.onrender.com/api/respuestas/crear/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ejercicio: ejercicioId,
            respuesta_usuario: respuesta,
          }),
        }
      );

      const text = await response.text();
      console.log("RESPUESTA ENVIAR:", text);

      if (!response.ok) {
        throw new Error("No se pudo enviar");
      }

      Alert.alert("Éxito", "Respuesta enviada correctamente");

      setRespuesta("");

    } catch (error: any) {
      console.log("ERROR ENVIAR:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Panel de Estudiante
      </Text>

      {ejercicios.map((item) => (
        <View
          key={item.id}
          style={{
            borderWidth: 1,
            padding: 15,
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {item.titulo}
          </Text>

          <Text style={{ marginVertical: 10 }}>
            {item.descripcion}
          </Text>

          <TextInput
            placeholder="Escribe tu respuesta"
            value={respuesta}
            onChangeText={setRespuesta}
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              marginBottom: 10,
            }}
          />

          <TouchableOpacity
            onPress={() => enviarRespuesta(item.id)}
            style={{
              backgroundColor: "#1976D2",
              padding: 12,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              Enviar Respuesta
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}