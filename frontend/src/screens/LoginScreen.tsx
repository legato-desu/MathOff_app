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

// 🔥 NUEVO: importar pantalla de registro
import RegisterScreen from "./RegisterScreen";

type Props = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [showPassword, setShowPassword] = useState(false);

  // 🔥 NUEVO: username en lugar de email
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 NUEVO: recordar usuario
  const [remember, setRemember] = useState(false);

  // 🔥 NUEVO: controlar pantalla registro
  const [isRegistering, setIsRegistering] = useState(false);

  const { login } = useAuthStore();

  // 🔥 NUEVO: cargar usuario guardado
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

  // 🚀 LOGIN
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      const data = await loginRequest(username, password);

      login(data.token);

      // 🔥 NUEVO: guardar o borrar usuario según checkbox
      if (remember) {
        await AsyncStorage.setItem("username", username);
      } else {
        await AsyncStorage.removeItem("username");
      }

      

    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  // 🔥 NUEVO: mostrar pantalla de registro
  if (isRegistering) {
    return <RegisterScreen onBack={() => setIsRegistering(false)} />;
  }

  return (
    <View style={styles.container}>

      <View style={styles.logoBox}>
        <Image source={logo} style={styles.logoImage} />
      </View>

      <Text style={styles.title}>MathOff</Text>

      {/* 🔥 NUEVO: USERNAME */}
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

      {/* 🔥 NUEVO: CHECKBOX RECORDARME */}
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

      {/* 🔥 NUEVO: IR A REGISTRO */}
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