import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import GraphScreen from "../screens/GraphScreen";
import ScanScreen from "../screens/ScanScreen";
import LibraryScreen from "../screens/LibraryScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Graph" component={GraphScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
}