import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import SavedGraphCard from "../components/SavedGraphCard";
import { useTheme } from "../theme/ThemeContext";
import { getStyles } from "../styles/library.styles";

export default function LibraryScreen() {

  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* 🔹 HEADER */}
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.header}>
            Librería
          </Text>
        </View>
      </View>

      {/* 🔹 SCROLL CENTRADO */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>

          {/* TABS */}
          <View style={styles.tabsContainer}>
            <Text style={styles.activeTab}>Historial</Text>
            <Text style={styles.inactiveTab}>Aprendizaje</Text>
          </View>

          {/* GRÁFICOS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Gráficos Guardados</Text>
            <Text style={styles.viewAll}>Ver todos</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <SavedGraphCard title="y = 1 - x²" />
            <SavedGraphCard title="y = sin(x)" />
          </ScrollView>

          {/* APRENDIZAJE */}
          <Text style={styles.quickLearnTitle}>
            Aprendizaje rápido
          </Text>

          {[
            {
              title: "Funciones lineales",
              desc: "Pendiente, intersecciones, y=mx+b",
              icon: "trending-up-outline"
            },
            {
              title: "Ecuaciones cuadráticas",
              desc: "Parábolas, raíces y factorización",
              icon: "analytics-outline"
            },
            {
              title: "Trigonometría",
              desc: "Seno, coseno y círculo unitario",
              icon: "pulse-outline"
            },
            {
              title: "Cálculo básico",
              desc: "Límites, derivadas e integrales",
              icon: "calculator-outline"
            }
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.card}>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={colors.primary}
                  style={{ marginRight: 10 }}
                />

                <View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.desc}</Text>
                </View>
              </View>

            </TouchableOpacity>
          ))}

        </View>
      </ScrollView>

    </View>
  );
}