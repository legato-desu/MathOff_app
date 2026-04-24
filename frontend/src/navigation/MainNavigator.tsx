import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import LoginScreen from "../screens/LoginScreen";
import LibraryScreen from "../screens/LibraryScreen";
import LearnDetailScreen from "../screens/LearnDetailScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="Tabs" component={BottomTabs} />
      
      {/* 🔹 NUEVA RUTA */}
      <Stack.Screen name="Libreria" component={LibraryScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="LearnDetail" component={LearnDetailScreen} />

    </Stack.Navigator>
  );
}