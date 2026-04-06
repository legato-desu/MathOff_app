import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../theme/ThemeContext";
import { createStyles } from "../styles/settings.styles";
import { useAuthStore } from "../store/authStore";

import { changePasswordRequest } from "../servicios/api";

export default function SettingsScreen() {

  const { isDark, toggleTheme, colors } = useTheme();
  const styles = createStyles(colors);

  const { logout, user } = useAuthStore();

  const [notifications, setNotifications] = useState(false);
  const [language, setLanguage] = useState("ES");

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  // 👁️ estados para mostrar/ocultar
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  // 📧 mostrar correo
  const handleShowEmail = () => {
    Alert.alert("Correo", user?.email || "No disponible");
  };

  // 🔐 cambio de contraseña REAL
  const handleChangePassword = async () => {

    if (!currentPass || !newPass || !repeatPass) {
      return Alert.alert("Error", "Completa todos los campos");
    }

    if (newPass !== repeatPass) {
      return Alert.alert("Error", "Las contraseñas no coinciden");
    }

    try {

      await changePasswordRequest(
        user.id,
        currentPass,
        newPass
      );

      Alert.alert("Éxito", "Contraseña actualizada");

      // limpiar
      setCurrentPass("");
      setNewPass("");
      setRepeatPass("");

      setShowPasswordModal(false);

    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Opciones</Text>

      {/* 👤 PERFIL */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={{ color: colors.primary, fontSize: 22 }}>👤</Text>
        </View>

        <View>
          <Text style={styles.name}>{user?.username || "Usuario"}</Text>
          <Text style={styles.plan}>Activo</Text>
        </View>
      </View>

      <Text style={styles.section}>CUENTA</Text>

      <View style={styles.card}>

        {/* 📧 VER CORREO */}
        <TouchableOpacity style={styles.row} onPress={handleShowEmail}>
          <View style={styles.rowLeft}>
            <Ionicons name="mail-outline" size={18} color={colors.primary} />
            <Text style={styles.item}>Correo electronico</Text>
          </View>
        </TouchableOpacity>

        {/* 🔐 CAMBIAR PASSWORD */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => setShowPasswordModal(true)}
        >
          <View style={styles.rowLeft}>
            <Ionicons name="lock-closed-outline" size={18} color={colors.primary} />
            <Text style={styles.item}>Cambiar contraseña</Text>
          </View>
        </TouchableOpacity>

      </View>

      <Text style={styles.section}>PREFERENCIAS</Text>

      <View style={styles.card}>

        {/* 🌙 TEMA */}
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

        {/* 🔔 NOTIFICACIONES */}
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

        {/* 🌍 IDIOMA */}
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="language-outline" size={18} color={colors.primary} />
            <Text style={styles.item}>Idioma</Text>
          </View>

          <TouchableOpacity
            onPress={() => setLanguage(language === "ES" ? "EN" : "ES")}
          >
            <Text style={styles.value}>{language}</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* 🚪 LOGOUT */}
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>CERRAR SESION</Text>
      </TouchableOpacity>

      {/* 🔐 MODAL CAMBIO CONTRASEÑA */}
      <Modal visible={showPasswordModal} transparent animationType="slide">

        <View style={{
          flex: 1,
          backgroundColor: colors.background + "CC",
          justifyContent: "center",
          padding: 20
        }}>

          <View style={{
            backgroundColor: colors.card,
            padding: 20,
            borderRadius: 12
          }}>

            <Text style={{ color: colors.text, marginBottom: 10 }}>
              Cambiar contraseña
            </Text>

            {/* 🔐 ACTUAL */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} />

              <TextInput
                placeholder="Actual"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showCurrent}
                style={styles.input}
                onChangeText={setCurrentPass}
              />

              <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
                <Ionicons
                  name={showCurrent ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* 🔐 NUEVA */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} />

              <TextInput
                placeholder="Nueva"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showNew}
                style={styles.input}
                onChangeText={setNewPass}
              />

              <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                <Ionicons
                  name={showNew ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* 🔐 REPETIR */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} />

              <TextInput
                placeholder="Repetir nueva"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showRepeat}
                style={styles.input}
                onChangeText={setRepeatPass}
              />

              <TouchableOpacity onPress={() => setShowRepeat(!showRepeat)}>
                <Ionicons
                  name={showRepeat ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* 🔥 BOTONES */}
            <View style={{ flexDirection: "row", marginTop: 10 }}>

              <TouchableOpacity
                style={[
                  styles.button,
                  { flex: 1, marginRight: 5, backgroundColor: colors.border }
                ]}
                onPress={() => {
                  setShowPasswordModal(false);
                  setCurrentPass("");
                  setNewPass("");
                  setRepeatPass("");
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { flex: 1, marginLeft: 5 }]}
                onPress={handleChangePassword}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>

      </Modal>

    </View>
  );
}