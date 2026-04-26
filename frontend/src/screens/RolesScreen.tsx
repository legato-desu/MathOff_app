import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RolesScreen() {
  const { colors } = useTheme();

  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");

      const response = await fetch(
        "https://mathoff-app.onrender.com/api/users/roles/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();
      console.log("ROLES RAW:", text);

      const data = JSON.parse(text);

      // 🔥 VALIDACIÓN CLAVE
      if (!Array.isArray(data)) {
        console.log("ERROR: No es array", data);
        return;
      }

      setRoles(data);

    } catch (error) {
      console.log("ERROR ROLES:", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 22, marginBottom: 20 }}>
        Lista de Roles
      </Text>

      {roles.length === 0 ? (
        <Text style={{ color: colors.textSecondary }}>
          No hay roles o no autorizado
        </Text>
      ) : (
        roles.map((role) => (
          <View
            key={role.id}
            style={{
              backgroundColor: colors.card,
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "bold" }}>
              {role.nombre}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}