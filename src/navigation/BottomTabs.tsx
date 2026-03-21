import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import GraphScreen from "../screens/GraphScreen";
import ScanScreen from "../screens/ScanScreen";
import LibraryScreen from "../screens/LibraryScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ onLogout }: any) {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#0D2A36",
          borderTopWidth: 0,
          height: 70
        },

        tabBarActiveTintColor: "#00C2FF",
        tabBarInactiveTintColor: "#7aa",

        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any;

          if (route.name === "Grafico") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Escaner") {
            iconName = focused ? "scan" : "scan-outline";
          } else if (route.name === "Libreria") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Opciones") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        }
      })}
    >

      <Tab.Screen name="Grafico" component={GraphScreen} />
      <Tab.Screen 
      name="Escaner" 
      component={ScanScreen} 
      options={{
        tabBarIcon: ({ focused }) => (
          <View style= {{
            backgroundColor: "#00c2ff",
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30
          }} >
            <Ionicons name="scan" size={28} color={"#071A24"}/>
          </View>
        )
        }}
          />
      <Tab.Screen name="Libreria" component={LibraryScreen} />

      <Tab.Screen name="Opciones">
        {() => <SettingsScreen onLogout={onLogout} />}
      </Tab.Screen>

    </Tab.Navigator>
  );
}