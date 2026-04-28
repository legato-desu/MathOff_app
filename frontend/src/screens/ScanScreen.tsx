import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import { useTheme } from "../theme/ThemeContext";
import { useAuthStore } from "../store/authStore";

export default function ScanScreen() {
  const { colors } = useTheme();

  const token = useAuthStore((state) => state.token);
  const openLogin = useAuthStore((state) => state.openLogin);

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

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

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Foto tomada:", photo.uri);
        // Aquí puedes guardar la foto, enviarla al backend, etc.
      } catch (e) {
        console.log("Error al tomar foto", e);
      }
    }
  };

  if (!token) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, marginBottom: 20 }}>
          Debes iniciar sesión para usar el escáner
        </Text>
        <TouchableOpacity
          onPress={openLogin}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={{ color: colors.white }}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!permission) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Cargando permisos...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>No hay permisos de cámara</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} />
      <TouchableOpacity
        onPress={handleCapture}
        style={[styles.captureButton, { backgroundColor: colors.primary }]}
      >
        <Text style={{ color: colors.white }}>📸</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 12,
    borderRadius: 10,
  },
  captureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    padding: 20,
    borderRadius: 50,
  },
});
