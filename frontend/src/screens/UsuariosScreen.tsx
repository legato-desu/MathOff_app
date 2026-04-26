import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UsuariosScreen() {
  const { colors } = useTheme();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const token = await AsyncStorage.getItem("accessToken");

    const response = await fetch(
      "https://mathoff-app.onrender.com/api/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      console.log("ERROR USERS:", data);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 22, marginBottom: 20 }}>
        Usuarios
      </Text>

      {users.map((user) => (
        <View
          key={user.id}
          style={{
            backgroundColor: colors.card,
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: colors.text, fontWeight: "bold" }}>
            {user.username}
          </Text>

          <Text style={{ color: colors.textSecondary }}>
            {user.email}
          </Text>

          <Text style={{ color: colors.primary }}>
            {user.role || "Sin rol"}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}