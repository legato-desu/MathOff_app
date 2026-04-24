import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../theme/ThemeContext";
import { createStyles } from "../styles/settings.styles";
import { useAuthStore } from "../store/authStore";
import { changePasswordRequest } from "../servicios/api";
import { TouchableWithoutFeedback } from "react-native";

export default function SettingsScreen() {

  const { isDark, toggleTheme, colors } = useTheme();
  const styles = createStyles(colors);

  const navigation = useNavigation();
  const { logout, user } = useAuthStore();

  const [notifications, setNotifications] = useState(false);
  const [language, setLanguage] = useState("ES");

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  const handleShowEmail = () => {
  const message = user?.email || "No disponible";

  if (Platform.OS === "web") {
    window.alert(`Correo: ${message}`);
  } else {
    Alert.alert("Correo", message);
  }
};

const handleShowRole = () => {
  const message = "Usuario";

  if (Platform.OS === "web") {
    window.alert(`Rol: ${message}`);
  } else {
    Alert.alert("Rol", message);
  }
};

  const handleChangePassword = async () => {
    if (!currentPass || !newPass || !repeatPass) {
      return Alert.alert("Error", "Completa todos los campos");
    }

    if (newPass !== repeatPass) {
      return Alert.alert("Error", "Las contraseñas no coinciden");
    }

    try {
      await changePasswordRequest(user.id, currentPass, newPass);

      Alert.alert("Éxito", "Contraseña actualizada");

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

      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.header}>Opciones</Text>

        {/* PERFIL */}
        <View style={styles.profileCard}>

          <View style={styles.profileLeft}>
            <View style={styles.avatar}>
              <Text style={{ color: colors.primary, fontSize: 22 }}>👤</Text>
            </View>

            <View>
              <Text style={styles.name}>{user?.username || "Usuario"}</Text>
              <Text style={styles.plan}>Activo</Text>
            </View>
          </View>

          {/* 🔥 ICONO LOGOUT DERECHA */}
          <TouchableOpacity onPress={logout} style={{ padding: 8 }}>
            <Ionicons name="log-out-outline" size={22} color={colors.primary} />
          </TouchableOpacity>

        </View>

        {/* APP */}
        <Text style={styles.section}>APP</Text>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("Libreria" as never)}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="library-outline" size={18} color={colors.primary} />
              <Text style={styles.item}>Librería</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* CUENTA */}
        <Text style={styles.section}>CUENTA</Text>

        <View style={styles.card}>

          <TouchableOpacity style={styles.row} onPress={handleShowEmail}>
            <View style={styles.rowLeft}>
              <Ionicons name="mail-outline" size={18} color={colors.primary} />
              <Text style={styles.item}>Correo electronico</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleShowRole}>
            <View style={styles.rowLeft}>
              <Ionicons name="shield-outline" size={18} color={colors.primary} />
              <Text style={styles.item}>Rol</Text>
            </View>
          </TouchableOpacity>

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

        {/* PREFERENCIAS */}
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

        {/* BOTÓN ABAJO */}
        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
        </TouchableOpacity>

      </ScrollView>

      <Modal
  visible={showPasswordModal}
  transparent
  animationType="fade"
  onRequestClose={() => setShowPasswordModal(false)}
>
  <TouchableWithoutFeedback
    onPress={() => setShowPasswordModal(false)}
  >
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background + "CC",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Evita que se cierre al tocar dentro */}
      <TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: colors.card,
            padding: 20,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: colors.text,
              marginBottom: 15,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Cambiar contraseña
          </Text>

          {[
            {
              placeholder: "Actual",
              set: setCurrentPass,
              show: showCurrent,
              toggle: () => setShowCurrent(!showCurrent),
            },
            {
              placeholder: "Nueva",
              set: setNewPass,
              show: showNew,
              toggle: () => setShowNew(!showNew),
            },
            {
              placeholder: "Repetir nueva",
              set: setRepeatPass,
              show: showRepeat,
              toggle: () => setShowRepeat(!showRepeat),
            },
          ].map((field, i) => (
            <View key={i} style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={colors.textSecondary}
              />

              <TextInput
                placeholder={field.placeholder}
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!field.show}
                style={styles.input}
                onChangeText={field.set}
              />

              <TouchableOpacity onPress={field.toggle}>
                <Ionicons
                  name={field.show ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          ))}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowPasswordModal(false);
                setCurrentPass("");
                setNewPass("");
                setRepeatPass("");
              }}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: colors.border,
                flex: 1,
                marginRight: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.text }}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleChangePassword}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: colors.primary,
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Guardar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
</Modal>

    </View>
  );
}