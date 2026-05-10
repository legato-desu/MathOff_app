import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useTheme } from "../theme/ThemeContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UsuariosScreen() {

  const { colors } = useTheme();

  const [users, setUsers] =
    useState<any[]>([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {

    try {

      const token =
        await AsyncStorage.getItem(
          "accessToken"
        );

      const response = await fetch(
        "https://mathoff-app.onrender.com/api/users/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setUsers(data);
      }

    } catch (error) {

      console.log(
        "ERROR USERS:",
        error
      );
    }
  };

  const eliminarUsuario = async (
    id: number
  ) => {

    try {

      const token =
        await AsyncStorage.getItem(
          "accessToken"
        );

      const response = await fetch(
        `https://mathoff-app.onrender.com/api/users/${id}/`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {

        Alert.alert(
          "Éxito",
          "Usuario eliminado"
        );

        setUsers((prev) =>
          prev.filter(
            (u) => u.id !== id
          )
        );
      }

    } catch (error) {

      console.log(
        "ERROR ELIMINAR:",
        error
      );
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          colors.background,
        padding: 20,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Usuarios
      </Text>

      {users.map((user) => (

        <View
          key={user.id}
          style={{
            backgroundColor:
              colors.card,

            padding: 15,

            borderRadius: 12,

            marginBottom: 15,

            borderWidth: 1,

            borderColor:
              colors.border,
          }}
        >

          <Text
            style={{
              color: colors.text,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {user.username}
          </Text>

          <Text
            style={{
              color:
                colors.textSecondary,
              marginTop: 5,
            }}
          >
            {user.email}
          </Text>

          <Text
            style={{
              color: colors.primary,
              marginTop: 5,
            }}
          >
            {user.role || "Sin rol"}
          </Text>

          <TouchableOpacity
            onPress={() =>
              eliminarUsuario(
                user.id
              )
            }
            style={{
              backgroundColor:
                "#ef4444",

              padding: 12,

              borderRadius: 10,

              marginTop: 12,

              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Eliminar Usuario
            </Text>
          </TouchableOpacity>

        </View>
      ))}
    </ScrollView>
  );
}