import { View, Text } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export default function ReportesScreen() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <Text style={{ color: colors.text, fontSize: 22 }}>
        Lista de Reportes (placeholder)
      </Text>
    </View>
  );
}