import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import { useTheme } from "../theme/ThemeContext";
import { createStyles } from "../styles/graph.styles";
import { useAuthStore } from "../store/authStore";

export default function ScanScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const token = useAuthStore((state) => state.token);
  const openLogin = useAuthStore((state) => state.openLogin);

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [photoUri, setPhotoUri] = useState<string | null>(null);

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

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        JWT_TOKENS
        console.log("Foto tomada:", photo.uri);
        setPhotoUri(photo.uri); 
      } catch (e) {
        console.log("Error al tomar foto", e);
      }
    }
  };

  // NO LOGIN
  if (!token) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" }
        ]}
      >
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
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // PREVIEW DE FOTO
  if (photoUri) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Image
          source={{ uri: photoUri }}
          style={{ flex: 1 }}
          resizeMode="contain"
        />

        <View
          style={{
            position: "absolute",
            bottom: 40,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          {/* ❌ Cancelar */}
          <TouchableOpacity
            onPress={() => setPhotoUri(null)}
            style={{
              backgroundColor: "#ff4444",
              padding: 15,
              borderRadius: 10
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Cancelar
            </Text>
          </TouchableOpacity>

          {/* ✅ Enviar */}
          <TouchableOpacity
            onPress={() => {
              console.log("Enviar foto:", photoUri);

              // 👉 aquí puedes enviarla al backend
              // ejemplo:
              // uploadPhoto(photoUri);

              setPhotoUri(null);
            }}
            style={{
              backgroundColor: colors.primary,
              padding: 15,
              borderRadius: 10
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Enviar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!permission) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" }
        ]}
      >
        <Text style={{ color: colors.text }}>Cargando permisos...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" }
        ]}
      >
        <Text style={{ color: colors.text }}>
          No hay permisos de cámara
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} />

      <TouchableOpacity
        onPress={handleCapture}
        style={{
          position: "absolute",
          bottom: 40,
          alignSelf: "center",
          padding: 20,
          borderRadius: 50,
          backgroundColor: colors.primary
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20 }}>📸</Text>
      </TouchableOpacity>
    </View>
  );
}