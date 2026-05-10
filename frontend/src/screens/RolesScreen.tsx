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

export default function RolesScreen() {

  const { colors } = useTheme();

  const [roles, setRoles] =
    useState<any[]>([]);

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {

    try {

      const token =
        await AsyncStorage.getItem(
          "accessToken"
        );

      const response = await fetch(
        "https://mathoff-app.onrender.com/api/roles/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setRoles(data);
      }

    } catch (error) {

      console.log(
        "ERROR ROLES:",
        error
      );
    }
  };

  const eliminarRol = async (
    id: number
  ) => {

    try {

      const token =
        await AsyncStorage.getItem(
          "accessToken"
        );

      const response = await fetch(
        `https://mathoff-app.onrender.com/api/roles/${id}/`,
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
          "Rol eliminado"
        );

        setRoles((prev) =>
          prev.filter(
            (r) => r.id !== id
          )
        );
      }

    } catch (error) {

      console.log(
        "ERROR DELETE ROLE:",
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
        Roles
      </Text>

      {roles.map((role) => (

        <View
          key={role.id}
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
            {role.nombre}
          </Text>

          <TouchableOpacity
            onPress={() =>
              eliminarRol(
                role.id
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
              Eliminar Rol
            </Text>
          </TouchableOpacity>

        </View>
      ))}
    </ScrollView>
  );
}