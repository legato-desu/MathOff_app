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

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      return Alert.alert("Error", "Completa todos los campos");
    }

    try {
      await registerRequest(username, email, password);

      Alert.alert("Éxito", "Cuenta creada correctamente");

      onBack();

    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Crear cuenta</Text>

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

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={18} color={colors.textSecondary} />
        <TextInput
          placeholder="Correo"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.link}>
          Volver al login
        </Text>
      </TouchableOpacity>

    </View>
  );
}