import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

type Props = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: Props) {
  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoBox}>
        <Text style={styles.logo}>Σ</Text>
      </View>

      <Text style={styles.title}>MathOff</Text>
      <Text style={styles.subtitle}>
        Precision logic, digital speed.
      </Text>

      {/* Inputs */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#7aa"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#7aa"
        secureTextEntry
        style={styles.input}
      />

      {/* Forgot */}
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot?</Text>
      </TouchableOpacity>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.or}>OR CONNECT WITH</Text>

      {/* Social */}
      <View style={styles.socialRow}>
        <View style={styles.socialBtn}>
          <Text style={{ color: "#fff" }}>Google</Text>
        </View>

        <View style={styles.socialBtn}>
          <Text style={{ color: "#fff" }}>Apple</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        New to the laboratory?{" "}
        <Text style={styles.link}>Create an account</Text>
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
    backgroundColor: "#0D2A36",
    padding: 15,
    borderRadius: 12,
    color: "#fff",
    marginBottom: 15
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
    alignItems: "center"
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