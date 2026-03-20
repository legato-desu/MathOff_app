import React, { useState } from "react";
import LoginScreen from "../screens/LoginScreen";
import BottomTabs from "./BottomTabs";

export default function MainNavigator() {

  const [isLogged, setIsLogged] = useState(false);

  return isLogged
    ? <BottomTabs onLogout={() => setIsLogged(false)} />
    : <LoginScreen onLogin={() => setIsLogged(true)} />;
}