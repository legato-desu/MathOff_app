import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "../theme/ThemeContext";
import { createStyles } from "../styles/login.styles";

import { loginRequest } from "../servicios/api";
import { useAuthStore } from "../store/authStore";

// 🔥 IMPORTAR REGISTER
import RegisterScreen from "./RegisterScreen";

// 🔥 TIPADO CORRECTO
type Props = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);

  const [isRegistering, setIsRegistering] = useState(false);

  const { login } = useAuthStore();

  // 🔥 AUTO CARGAR USUARIO GUARDADO
  useEffect(() => {
    const loadUser = async () => {
      const saved = await AsyncStorage.getItem("username");
      if (saved) {
        setUsername(saved);
        setRemember(true);
      }
    };
    loadUser();
  }, []);

  // 🔥 LOGIN REAL
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      const data = await loginRequest(username, password);

      // 🔥 GUARDAR TOKEN + USUARIO
      login(data.token, data.user);

      // 🔥 RECORDAR USUARIO
      if (remember) {
        await AsyncStorage.setItem("username", username);
      } else {
        await AsyncStorage.removeItem("username");
      }

      onLogin();

    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // 🔥 MOSTRAR REGISTER SCREEN
  if (isRegistering) {
    return (
      <RegisterScreen
        onBack={() => setIsRegistering(false)} // ✅ SOLUCIÓN ERROR
      />
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.logoBox}>
        <Image source={logo} style={styles.logoImage} />
      </View>

      <Text style={styles.title}>MathOff</Text>

      {/* 🔥 USERNAME */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={18} color={colors.textSecondary} />
        <TextInput
          placeholder="Usuario"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* 🔒 PASSWORD */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* 🔥 RECORDARME */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
        <TouchableOpacity onPress={() => setRemember(!remember)}>
          <Ionicons
            name={remember ? "checkbox" : "square-outline"}
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 8, color: colors.text }}>
          Recordarme
        </Text>
      </View>

      {/* 🔥 BOTÓN LOGIN */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>INICIAR</Text>
      </TouchableOpacity>

      {/* 🔥 IR A REGISTRO */}
      <Text style={styles.footer}>
        No tienes cuenta?{" "}
        <Text
          style={styles.link}
          onPress={() => setIsRegistering(true)}
        >
          Registrarse
        </Text>
      </Text>

    </View>
  );
}