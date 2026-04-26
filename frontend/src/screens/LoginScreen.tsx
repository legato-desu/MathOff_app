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
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../theme/ThemeContext";
import { createStyles } from "../styles/login.styles";

import { loginRequest } from "../servicios/api";
import { useAuthStore } from "../store/authStore";

import RegisterScreen from "./RegisterScreen";


export default function LoginScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const login = useAuthStore((state) => state.login);

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

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      const data = await loginRequest(username, password);

      // 🔐 Guardar en Zustand
      login(data.token, data.user);

      // guardar token real
      await AsyncStorage.setItem("accessToken", data.token);

      // 💾 Recordar usuario
      if (remember) {
        await AsyncStorage.setItem("username", username);
      } else {
        await AsyncStorage.removeItem("username");
      }


    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al iniciar sesión");
    }
  };

  // 🔁 CAMBIO A REGISTRO
  if (isRegistering) {
    return (
      <RegisterScreen
        onBack={() => setIsRegistering(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      

      <View style={styles.logoBox}>
        <Image source={logo} style={styles.logoImage} />
      </View>

      <Text style={styles.title}>MathOff</Text>

      {/* 👤 USERNAME */}
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

      {/* ✅ RECORDARME */}
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

      {/* 🚀 LOGIN */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>INICIAR</Text>
      </TouchableOpacity>

      {/* 🔗 REGISTRO */}
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