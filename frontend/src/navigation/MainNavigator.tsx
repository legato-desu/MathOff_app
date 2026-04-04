import { useAuthStore } from "../store/authStore";
import LoginScreen from "../screens/LoginScreen";
import BottomTabs from "./BottomTabs";

export default function MainNavigator() {
  const token = useAuthStore((state) => state.token);

  return token ? <BottomTabs /> : <LoginScreen onLogin={() => {}} />;
}