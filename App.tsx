import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "./src/theme/ThemeContext";
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}