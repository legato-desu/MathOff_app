import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import LoginScreen from "../screens/LoginScreen";
import LibraryScreen from "../screens/LibraryScreen";
import LearnDetailScreen from "../screens/LearnDetailScreen";

import AdminDashboard from "../screens/AdminDashboard";
import ProfesorDashboard from "../screens/ProfesorDashboard";
import EstudianteDashboard from "../screens/EstudianteDashboard";

import UsuariosScreen from "../screens/UsuariosScreen";
import RolesScreen from "../screens/RolesScreen";
import ReportesScreen from "../screens/ReportesScreen";

import { useAuthStore } from "../store/authStore";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const user = useAuthStore((state) => state.user);

  const renderPantallaPrincipal = () => {
    if (!user?.role) {
      return <Stack.Screen name="Tabs" component={BottomTabs} />;
    }

    if (user.role === "Administrador") {
      return (
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      );
    }

    if (user.role === "Docente") {
      return (
        <Stack.Screen name="ProfesorDashboard" component={ProfesorDashboard} />
      );
    }

    if (user.role === "Estudiante") {
      return (
        <Stack.Screen name="EstudianteDashboard" component={EstudianteDashboard} />
      );
    }

    return <Stack.Screen name="Tabs" component={BottomTabs} />;
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="Tabs" component={BottomTabs} />

      <Stack.Screen name="Usuarios" component={UsuariosScreen} />
      <Stack.Screen name="Roles" component={RolesScreen} />
      <Stack.Screen name="Reportes" component={ReportesScreen} />

      <Stack.Screen name="Libreria" component={LibraryScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LearnDetail" component={LearnDetailScreen} />

    </Stack.Navigator>
  );
}