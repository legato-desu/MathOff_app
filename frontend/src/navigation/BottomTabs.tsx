import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { useTheme } from "../theme/ThemeContext";

import GraphScreen from "../screens/GraphScreen";
import ScanScreen from "../screens/ScanScreen";
import LibraryScreen from "../screens/LibraryScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          height: 70
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,

        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any;

          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Escaner") {
            iconName = focused ? "scan" : "scan-outline";
          } else if (route.name === "Grafico") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Opciones") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        }
      })}
    >

      {/* 🔹 INICIO (antes Librería) */}
      <Tab.Screen name="Inicio" component={LibraryScreen} />

      {/* 🔹 ESCÁNER */}
      <Tab.Screen 
        name="Escaner" 
        component={ScanScreen}
        options={{
          tabBarIcon: () => (
            <View style={{
              backgroundColor: colors.primary,
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30
            }}>
              <Ionicons name="scan" size={28} color={colors.background}/>
            </View>
          )
        }}
      />

      {/* 🔹 GRÁFICO */}
      <Tab.Screen name="Grafico" component={GraphScreen} />

      {/* 🔹 OPCIONES */}
      <Tab.Screen name="Opciones" component={SettingsScreen} />

    </Tab.Navigator>
  );
}