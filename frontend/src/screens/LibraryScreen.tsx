import React from "react";
import { View, Text } from "react-native";
import SavedGraphCard from "../components/SavedGraphCard";
import { useTheme } from "../theme/ThemeContext";
import { getStyles } from "../styles/library.styles";

export default function LibraryScreen() {

  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>

      <Text style={styles.header}>
        Libreria
      </Text>

      {/* TABS */}
      <View style={styles.tabsContainer}>
        <Text style={styles.activeTab}>Historial</Text>
        <Text style={styles.inactiveTab}>Aprendizaje rapido</Text>
      </View>

      {/* SAVED GRAPHS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Gráficos Guardados</Text>
        <Text style={styles.viewAll}>Ver Todos</Text>
      </View>

      <View style={styles.graphRow}>
        <SavedGraphCard title="y = 1 - x²" />
        <SavedGraphCard title="y = sin(x)" />
      </View>

      {/* QUICK LEARN */}
      <Text style={styles.quickLearnTitle}>
        Aprendizaje Rapido
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Funciones lineales</Text>
        <Text style={styles.cardSubtitle}>
          Pendiente, intersecciones, y=mx+b
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ecuaciones cuadráticas</Text>
        <Text style={styles.cardSubtitle}>
          Parábolas, raíces, y factorización
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Funciones trigonométricas</Text>
        <Text style={styles.cardSubtitle}>
          Seno, coseno, y círculo unitario
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cálculo básico</Text>
        <Text style={styles.cardSubtitle}>
          Límites, derivadas, e integrales
        </Text>
      </View>

    </View>
  );
}