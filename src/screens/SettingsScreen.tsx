import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch
} from "react-native";

type Props = {
  onLogout: () => void;
};

export default function SettingsScreen({ onLogout }: Props) {

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Text style={styles.header}>Opciones</Text>

      {/* PROFILE CARD */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={{ color: "#00C2FF", fontSize: 22 }}>Σ</Text>
        </View>

        <View>
          <Text style={styles.name}>Andres David</Text>
          <Text style={styles.plan}>Miembro Premium</Text>
        </View>
      </View>

      {/* ACCOUNT */}
      <Text style={styles.section}>CUENTA</Text>

      <View style={styles.card}>
        <Text style={styles.item}>Correo electronico</Text>
        <Text style={styles.item}>Contraseña</Text>
      </View>

      {/* PREFERENCES */}
      <Text style={styles.section}>PREFERENCIAS</Text>

      <View style={styles.card}>

        <View style={styles.row}>
          <Text style={styles.item}>Modo oscuro</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ true: "#00C2FF", false: "#444" }}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.item}>Idioma</Text>
          <Text style={styles.value}>Español</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.item}>Notificaciones</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ true: "#00C2FF", false: "#444" }}
          />
        </View>

      </View>

      {/* SUPPORT */}
      <Text style={styles.section}>SOPORTE</Text>

      <View style={styles.card}>
        <Text style={styles.item}>Centro de ayuda</Text>
        <Text style={styles.item}>Politica de privacidad</Text>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logout} onPress={onLogout}>
        <Text style={styles.logoutText}>CERRAR SESION</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#071A24",
    padding: 20
  },

  header: {
    color: "#E8F6FF",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20
  },

  profileCard: {
    backgroundColor: "#0D2A36",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#081F2A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500"
  },

  plan: {
    color: "#00C2FF",
    marginTop: 2
  },

  section: {
    color: "#6f8b99",
    fontSize: 12,
    marginBottom: 10,
    marginTop: 10,
    letterSpacing: 1
  },

  card: {
    backgroundColor: "#0D2A36",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  item: {
    color: "#E8F6FF",
    paddingVertical: 8
  },

  value: {
    color: "#7aa"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logout: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ff4d4d",
    borderRadius: 14,
    padding: 15,
    alignItems: "center"
  },

  logoutText: {
    color: "#ff4d4d",
    fontWeight: "600"
  }

});