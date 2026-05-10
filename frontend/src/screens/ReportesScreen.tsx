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
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../theme/ThemeContext";

export default function ReportesScreen() {

  const { colors } = useTheme();

  const [ejercicios, setEjercicios] =
    useState<any[]>([]);

  const [editandoId, setEditandoId] =
    useState<number | null>(null);

  const [titulo, setTitulo] =
    useState("");

  const [descripcion, setDescripcion] =
    useState("");

  const [funcionCorrecta,
    setFuncionCorrecta] =
    useState("");

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {

    try {

      const token =
        await AsyncStorage.getItem(
          "accessToken"
        );

      const res = await fetch(
        "https://mathoff-app.onrender.com/api/ejercicios/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setEjercicios(data);
      }

    } catch (error) {

      console.log(
        "ERROR REPORTES:",
        error
      );
    }
  };

  const eliminarEjercicio = async (
    id: number
  ) => {

    try {

      const token =
        await AsyncStorage.getItem(
          "accessToken"
        );

      const response = await fetch(
        `https://mathoff-app.onrender.com/api/ejercicios/${id}/`,
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
          "Ejercicio eliminado"
        );

        setEjercicios((prev) =>
          prev.filter(
            (e) => e.id !== id
          )
        );
      }

    } catch (error) {

      console.log(
        "ERROR DELETE:",
        error
      );
    }
  };

  const editarEjercicio = (
    item: any
  ) => {

    setEditandoId(item.id);

    setTitulo(item.titulo);

    setDescripcion(
      item.descripcion
    );

    setFuncionCorrecta(
      item.funcion_correcta
    );
  };

  const guardarCambios = async () => {

    try {

      const token =
        await AsyncStorage.getItem(
          "accessToken"
        );

      const response = await fetch(
        `https://mathoff-app.onrender.com/api/ejercicios/${editandoId}/`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            titulo,
            descripcion,
            funcion_correcta:
              funcionCorrecta,
          }),
        }
      );

      if (response.ok) {

        Alert.alert(
          "Éxito",
          "Ejercicio actualizado"
        );

        setEditandoId(null);

        cargar();
      }

    } catch (error) {

      console.log(
        "ERROR UPDATE:",
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
        Reportes / Ejercicios
      </Text>

      {editandoId && (

        <View
          style={{
            backgroundColor:
              colors.card,

            padding: 15,

            borderRadius: 12,

            marginBottom: 20,
          }}
        >

          <TextInput
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Título"
            style={{
              borderWidth: 1,
              padding: 12,
              marginBottom: 10,
              borderRadius: 10,
              color: colors.text,
            }}
          />

          <TextInput
            value={descripcion}
            onChangeText={
              setDescripcion
            }
            placeholder="Descripción"
            style={{
              borderWidth: 1,
              padding: 12,
              marginBottom: 10,
              borderRadius: 10,
              color: colors.text,
            }}
          />

          <TextInput
            value={funcionCorrecta}
            onChangeText={
              setFuncionCorrecta
            }
            placeholder="Función"
            style={{
              borderWidth: 1,
              padding: 12,
              marginBottom: 10,
              borderRadius: 10,
              color: colors.text,
            }}
          />

          <TouchableOpacity
            onPress={
              guardarCambios
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
              Guardar Cambios
            </Text>
          </TouchableOpacity>

        </View>
      )}

      {ejercicios.map((e) => (

        <View
          key={e.id}
          style={{
            backgroundColor:
              colors.card,

            padding: 15,

            borderRadius: 12,

            marginBottom: 15,
          }}
        >

          <Text
            style={{
              color: colors.text,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {e.titulo}
          </Text>

          <Text
            style={{
              color:
                colors.textSecondary,
              marginTop: 5,
            }}
          >
            {e.descripcion}
          </Text>

          <TouchableOpacity
            onPress={() =>
              editarEjercicio(e)
            }
            style={{
              backgroundColor:
                colors.primary,

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
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              eliminarEjercicio(e.id)
            }
            style={{
              backgroundColor:
                "#ef4444",

              padding: 12,

              borderRadius: 10,

              marginTop: 10,

              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Eliminar
            </Text>
          </TouchableOpacity>

        </View>
      ))}
    </ScrollView>
  );
}