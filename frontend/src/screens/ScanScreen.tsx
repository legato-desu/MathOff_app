import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import { useTheme } from "../theme/ThemeContext";
import { createStyles } from "../styles/graph.styles"; // 👈 MISMO STYLES

import { useAuthStore } from "../store/authStore";

export default function ScanScreen() {

  const { colors } = useTheme();
  const styles = createStyles(colors); // 👈 MISMO SISTEMA

  const token = useAuthStore((state) => state.token);
  const openLogin = useAuthStore((state) => state.openLogin);

  const [permission, requestPermission] = useCameraPermissions();

  // ✅ HOOKS
  useEffect(() => {
    if (!token) {
      openLogin();
    }
  }, [token]);

  useEffect(() => {
    if (token && !permission?.granted) {
      requestPermission();
    }
  }, [permission, token]);

  // 🔒 BLOQUEO UI IGUAL QUE GRAPH
  if (!token) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>

        <Text style={{ color: colors.text, marginBottom: 20, textAlign: "center" }}>
          Debes iniciar sesión para usar el escáner
        </Text>

        <TouchableOpacity
          onPress={openLogin}
          style={{
            backgroundColor: colors.primary,
            padding: 12,
            borderRadius: 10
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  if (!permission) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: colors.text }}>Cargando permisos...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: colors.text }}>No hay permisos de cámara</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Escanear Ecuaciones</Text>

      <View
        style={{
          height: 320,
          borderRadius: 20,
          overflow: "hidden",
          marginTop: 10
        }}
      >
        <CameraView style={{ flex: 1 }} />
      </View>

    </View>
  );
}