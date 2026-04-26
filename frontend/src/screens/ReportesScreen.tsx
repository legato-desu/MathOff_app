import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReportesScreen() {
  const { colors } = useTheme();
  const [ejercicios, setEjercicios] = useState<any[]>([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    const res = await fetch(
      "https://mathoff-app.onrender.com/api/ejercicios/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (Array.isArray(data)) {
      setEjercicios(data);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 22, marginBottom: 20 }}>
        Reportes (Ejercicios)
      </Text>

      {ejercicios.map((e) => (
        <View
          key={e.id}
          style={{
            backgroundColor: colors.card,
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: colors.text, fontWeight: "bold" }}>
            {e.titulo}
          </Text>

          <Text style={{ color: colors.textSecondary }}>
            {e.descripcion}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}