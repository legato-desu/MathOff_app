import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { createStyles } from "../styles/login.styles";
import { registerRequest } from "../servicios/api";

type Props = {
  onBack: () => void;
};

export default function RegisterScreen({ onBack }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    console.log("USERNAME FRONT:", username); // 🔥 DEBUG

    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    try {
      await registerRequest(
        username.trim(),  // 🔥 IMPORTANTE
        email.trim(),
        password.trim()
      );

      Alert.alert("Éxito", "Usuario creado");
      onBack();

    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Crear cuenta</Text>

      {/* USERNAME */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={18} color={colors.textSecondary} />
        <TextInput
          placeholder="Usuario"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          value={username}
          onChangeText={(text) => {
            console.log("INPUT USERNAME:", text); // 🔥 DEBUG
            setUsername(text);
          }}
        />
      </View>

      {/* EMAIL */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={18} color={colors.textSecondary} />
        <TextInput
          placeholder="Correo"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* PASSWORD */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTRARSE</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.link}>Volver</Text>
      </TouchableOpacity>

    </View>
  );
}