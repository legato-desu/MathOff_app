import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import LoginScreen from "../screens/LoginScreen";
import LibraryScreen from "../screens/LibraryScreen";
import LearnDetailScreen from "../screens/LearnDetailScreen";

import AdminDashboard from "../screens/AdminDashboard";
import ProfesorDashboard from "../screens/ProfesorDashboard";
import EstudianteDashboard from "../screens/EstudianteDashboard";

import { useAuthStore } from "../store/authStore";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const user = useAuthStore((state) => state.user);

  const renderDashboard = () => {
    if (!user?.role) {
      return <Stack.Screen name="Tabs" component={BottomTabs} />;
    }

    if (user.role === "Administrador") {
      return (
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
        />
      );
    }

    if (user.role === "Docente") {
      return (
        <Stack.Screen
          name="ProfesorDashboard"
          component={ProfesorDashboard}
        />
      );
    }

    if (user.role === "Estudiante") {
      return (
        <Stack.Screen
          name="EstudianteDashboard"
          component={EstudianteDashboard}
        />
      );
    }

    return <Stack.Screen name="Tabs" component={BottomTabs} />;
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {renderDashboard()}

      <Stack.Screen
        name="Libreria"
        component={LibraryScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="LearnDetail"
        component={LearnDetailScreen}
      />
    </Stack.Navigator>
  );
}