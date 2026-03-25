import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";

import { styles } from "../styles/login.styles";
import { colors } from "../theme/colors";

type Props = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.logoBox}>
        <Image source={logo} style={styles.logoImage} />
      </View>

      <Text style={styles.title}>MathOff</Text>
      <Text style={styles.subtitle}></Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={18} color={colors.textSecondary} />
        <TextInput
          placeholder="Correo"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={!showPassword}
          style={styles.input}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot}>Olvido la contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>INICIAR</Text>
      </TouchableOpacity>

      <Text style={styles.or}>Ingresar con</Text>

      <View style={styles.socialRow}>
        <View style={styles.socialBtn}>
          <Ionicons name="logo-google" size={18} color={colors.white} />
          <Text style={styles.socialText}>Google</Text>
        </View>

        <View style={styles.socialBtn}>
          <Ionicons name="logo-apple" size={18} color={colors.white} />
          <Text style={styles.socialText}>Apple</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        No tienes cuenta?{" "}
        <Text style={styles.link}>Registrarse</Text>
      </Text>

    </View>
  );
}