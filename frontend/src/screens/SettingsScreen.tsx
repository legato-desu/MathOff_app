import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../theme/ThemeContext";
import { createStyles } from "../styles/settings.styles";
import { useAuthStore } from "../store/authStore";

type Props = {
  onLogout: () => void;
};

export default function SettingsScreen({ onLogout }: Props) {

  const { isDark, toggleTheme, colors } = useTheme();
  const styles = createStyles(colors);

  const { logout } = useAuthStore();

  const [notifications, setNotifications] = useState(false);

  const ItemRow = ({ icon, label }: any) => (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={18} color={colors.primary} />
        <Text style={styles.item}>{label}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </View>
  );

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>Opciones</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={{ color: colors.primary, fontSize: 22 }}>👤</Text>
        </View>

        <View>
          <Text style={styles.name}>Usuario</Text>
          <Text style={styles.plan}>Activo</Text>
        </View>
      </View>

      <Text style={styles.section}>CUENTA</Text>

      <View style={styles.card}>
        <ItemRow icon="mail-outline" label="Correo electronico" />
        <ItemRow icon="lock-closed-outline" label="Cambiar contraseña" />
      </View>

      <Text style={styles.section}>PREFERENCIAS</Text>

      <View style={styles.card}>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="moon-outline" size={18} color={colors.primary} />
            <Text style={styles.item}>Tema</Text>
          </View>

          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ true: colors.primary, false: colors.border }}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="notifications-outline" size={18} color={colors.primary} />
            <Text style={styles.item}>Notificaciones</Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ true: colors.primary, false: colors.border }}
          />
        </View>

      </View>

      {/* 🔥 LOGOUT REAL */}
      <TouchableOpacity
        style={styles.logout}
        onPress={() => {
          logout();
        }}
      >
        <Text style={styles.logoutText}>CERRAR SESION</Text>
      </TouchableOpacity>

    </View>
  );
}