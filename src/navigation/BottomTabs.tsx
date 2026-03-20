import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import GraphScreen from "../screens/GraphScreen";
import ScanScreen from "../screens/ScanScreen";
import LibraryScreen from "../screens/LibraryScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ onLogout }:any) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Graph" component={GraphScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Settings"> 
        {() => <SettingsScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}