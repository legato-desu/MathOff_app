import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onLogout: () => void;
};

export default function SettingsScreen({ onLogout }: Props) {

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const ItemRow = ({ icon, label }: any) => (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={18} color="#00C2FF" />
        <Text style={styles.item}>{label}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#7aa" />
    </View>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Text style={styles.header}>Opciones</Text>

      {/* PROFILE */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={{ color: "#00C2FF", fontSize: 22 }}>Σ</Text>
        </View>

        <View>
          <Text style={styles.name}>Andres Miranda</Text>
          <Text style={styles.plan}>Usuario Premium</Text>
        </View>
      </View>

      {/* ACCOUNT */}
      <Text style={styles.section}>CUENTA</Text>

      <View style={styles.card}>
        <ItemRow icon="mail-outline" label="Correo electronico" />
        <ItemRow icon="lock-closed-outline" label="Cambiar contraseña" />
      </View>

      {/* PREFERENCES */}
      <Text style={styles.section}>PREFERENCIAS</Text>

      <View style={styles.card}>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="moon-outline" size={18} color="#00C2FF" />
            <Text style={styles.item}>Modo oscuro</Text>
          </View>

          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ true: "#00C2FF", false: "#444" }}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="language-outline" size={18} color="#00C2FF" />
            <Text style={styles.item}>Idioma</Text>
          </View>

          <Text style={styles.value}>Español</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="notifications-outline" size={18} color="#00C2FF" />
            <Text style={styles.item}>Notificaciones</Text>
          </View>

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
        <ItemRow icon="help-circle-outline" label="Centro de ayuda" />
        <ItemRow icon="shield-checkmark-outline" label="Politica de privacidad" />
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
    marginBottom: 20
  },

  item: {
    color: "#E8F6FF",
    marginLeft: 10
  },

  value: {
    color: "#7aa"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },

  rowLeft: {
    flexDirection: "row",
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