import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../styles/settings.styles";
import { colors } from "../theme/colors";

type Props = {
  onLogout: () => void;
};

export default function SettingsScreen({ onLogout }: Props) {

  const [darkMode, setDarkMode] = useState(true);
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
          <Text style={styles.name}>Andres Miranda</Text>
          <Text style={styles.plan}>Usuario Premium</Text>
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
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ true: colors.primary, false: colors.border }}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="language-outline" size={18} color={colors.primary} />
            <Text style={styles.item}>Idioma</Text>
          </View>

          <Text style={styles.value}>Español</Text>
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

      <Text style={styles.section}>SOPORTE</Text>

      <View style={styles.card}>
        <ItemRow icon="help-circle-outline" label="Centro de ayuda" />
        <ItemRow icon="shield-checkmark-outline" label="Politica de privacidad" />
      </View>

      <TouchableOpacity style={styles.logout} onPress={onLogout}>
        <Text style={styles.logoutText}>CERRAR SESION</Text>
      </TouchableOpacity>

    </View>
  );
}