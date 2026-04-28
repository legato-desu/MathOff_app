import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SavedGraphCard from "../components/SavedGraphCard";
import { useTheme } from "../theme/ThemeContext";
import { getStyles } from "../styles/library.styles";

type NavigationProp = NativeStackNavigationProp<any>;

export default function LibraryScreen() {

  const { colors } = useTheme();
  const styles = getStyles(colors);

  const navigation = useNavigation<NavigationProp>();

  const learningItems = [
    {
      title: "Funciones lineales",
      desc: "Pendiente, intersecciones, y=mx+b",
      icon: "trending-up-outline",
      type: "lineal"
    },
    {
      title: "Ecuaciones cuadráticas",
      desc: "Parábolas, raíces y factorización",
      icon: "analytics-outline",
      type: "cuadratica"
    },
    {
      title: "Trigonometría",
      desc: "Seno, coseno y círculo unitario",
      icon: "pulse-outline",
      type: "trigonometria"
    },
    {
      title: "Cálculo básico",
      desc: "Límites, derivadas e integrales",
      icon: "calculator-outline",
      type: "calculo"
    }
  ];

  return (
    <View style={styles.container}>

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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>

          <View style={styles.tabsContainer}>
            <Text style={styles.activeTab}>Historial</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Gráficos Guardados</Text>
            <Text style={styles.viewAll}>Ver todos</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <SavedGraphCard title="y = 1 - x²" />
            <SavedGraphCard title="y = sin(x)" />
          </ScrollView>

          <Text style={styles.quickLearnTitle}>
            Aprendizaje rápido
          </Text>

          {learningItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() =>
                navigation.navigate("LearnDetail", {
                  type: item.type
                })
              }
            >
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