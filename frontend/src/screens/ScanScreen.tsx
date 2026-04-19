import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import { useTheme } from "../theme/ThemeContext";
import { useAuthStore } from "../store/authStore";

export default function ScanScreen() {

  const { colors } = useTheme();

  const token = useAuthStore((state) => state.token);
  const openLogin = useAuthStore((state) => state.openLogin);

  const [permission, requestPermission] = useCameraPermissions();

  // ✅ TODOS LOS HOOKS ARRIBA
  useEffect(() => {
    if (!token) {
      openLogin();
    }
  }, []);

  useEffect(() => {
    if (token && !permission?.granted) {
      requestPermission();
    }
  }, [permission, token]);

  // 🔒 DESPUÉS DE LOS HOOKS
  if (!token) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text, marginBottom: 20 }}>
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
          <Text style={{ color: "#fff" }}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando permisos...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No hay permisos de cámara</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ color: colors.text }}>Escanear Ecuaciones</Text>
      <CameraView style={{ height: 320, borderRadius: 20 }} />
    </View>
  );
}