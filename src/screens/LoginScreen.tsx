import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";

type Props = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoBox}>
        <Image source={logo} style={styles.logoImage} />
      </View>

      <Text style={styles.title}>MathOff</Text>
      <Text style={styles.subtitle}></Text>

      {/* Inputs */}
      <View style={styles.inputContainer}>
      <Ionicons name="mail-outline" size={18} color="#7aa" />
      <TextInput
        placeholder="Correo"
        placeholderTextColor="#7aa"
        style={styles.input}
      />
      </View>

      <View style={styles.inputContainer}>
  <Ionicons name="lock-closed-outline" size={18} color="#7aa" />

  <TextInput
    placeholder="Contraseña"
    placeholderTextColor="#7aa"
    secureTextEntry={!showPassword}
    style={styles.input}
  />

  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Ionicons
      name={showPassword ? "eye-off-outline" : "eye-outline"}
      size={18}
      color="#7aa"
    />
  </TouchableOpacity>
</View>
      {/* Forgot */}
      <TouchableOpacity>
        <Text style={styles.forgot}>Olvido la contraseña?</Text>
      </TouchableOpacity>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>INICIAR</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.or}>Ingresar con</Text>

      {/* Social */}
      <View style={styles.socialRow}>
        <View style={styles.socialBtn}>
          <Ionicons name="logo-google" size={18} color="#fff" />
          <Text style={styles.socialText}>Google</Text>
        </View>

        <View style={styles.socialBtn}>
          <Ionicons name="logo-apple" size={18} color="#fff" />
          <Text style={styles.socialText}>Apple</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        No tienes cuenta?{" "}
        <Text style={styles.link}>Registrarse</Text>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#071A24",
    padding: 25,
    justifyContent: "center"
  },

  inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#0D2A36",
  borderRadius: 12,
  paddingHorizontal: 12,
  marginBottom: 15
},

  logoBox: {
    width: 70,
    height: 70,
    backgroundColor: "#0D2A36",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 15
  },

  logo: {
    color: "#00C2FF",
    fontSize: 30
  },
  logoImage: {
    width: 60,
    height: 60,
    resizeMode: "contain"
  },

  title: {
    color: "#E8F6FF",
    fontSize: 24,
    textAlign: "center"
  },

  subtitle: {
    color: "#7aa",
    textAlign: "center",
    marginBottom: 30
  },

  input: {
  flex: 1,
  color: "#fff",
  paddingVertical: 15,
  marginLeft: 10
},

  forgot: {
    color: "#00C2FF",
    textAlign: "right",
    marginBottom: 20
  },

  button: {
    backgroundColor: "#00C2FF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center"
  },

  buttonText: {
    color: "#071A24",
    fontWeight: "bold"
  },

  or: {
    color: "#7aa",
    textAlign: "center",
    marginVertical: 20
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  socialBtn: {
  backgroundColor: "#0D2A36",
  padding: 15,
  borderRadius: 12,
  width: "48%",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "center",
  gap: 8
},
socialText: {
  color: "#fff"
},

  footer: {
    color: "#7aa",
    textAlign: "center",
    marginTop: 30
  },

  link: {
    color: "#00C2FF"
  }

});