import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useTheme } from "../theme/ThemeContext";

export default function ScanScreen() {
  const { colors } = useTheme();

  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando permisos...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
          padding: 20,
        }}
      >
        <Text style={{ color: colors.text, marginBottom: 10 }}>
          Necesitamos acceso a la cámara
        </Text>

        <Text
          onPress={requestPermission}
          style={{
            color: colors.primary,
            fontSize: 16,
          }}
        >
          Tocar para permitir cámara
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          marginBottom: 20,
        }}
      >
        Escanear Ecuaciones
      </Text>

      {/* Cámara */}
      <CameraView
        style={{
          height: 320,
          borderRadius: 20,
          overflow: "hidden",
        }}
      />

      {/* Resultado simulado */}
      <View
        style={{
          marginTop: 20,
          backgroundColor: colors.card,
          padding: 20,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontSize: 18,
          }}
        >
          ∫ (3x² + 2x + 1) dx
        </Text>
      </View>
    </View>
  );
}
