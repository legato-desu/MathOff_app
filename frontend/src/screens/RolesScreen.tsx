import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../theme/ThemeContext";

export default function RolesScreen() {
  const { colors } = useTheme();
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    const response = await fetch(
      "https://mathoff-app.onrender.com/api/roles/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setRoles(data);
  };

  return (
    <ScrollView 
    style={{ flex: 1, backgroundColor: colors.background }}
  contentContainerStyle={{ padding: 20 }}
    >
      <Text style={{ color: colors.text, fontSize: 22, marginBottom: 20 }}>
        Roles
      </Text>

      {roles.map((role) => (
        <View
          key={role.id}
          style={{
            backgroundColor: colors.card,
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: colors.text }}>
            {role.nombre}
          </Text>

          <Text style={{ color: colors.textSecondary }}>
            {role.descripcion}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}