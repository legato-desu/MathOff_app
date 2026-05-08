import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated
} from "react-native";

import { useAuthStore } from "../store/authStore";

import GraphView from "../components/GraphView";
import MathKeyboard from "../components/MathKeyboard";

import { useTheme } from "../theme/ThemeContext";
import { createStyles } from "../styles/graph.styles";

import { evaluateExpression } from "../utils/math.utils";
import { SafeAreaView } from "react-native-safe-area-context";


export default function GraphScreen() {

  const { colors } = useTheme();
  const styles = createStyles(colors);

  const token = useAuthStore((state) => state.token);
  const openLogin = useAuthStore((state) => state.openLogin);

  const [expression, setExpression] = useState("");
  const [functions, setFunctions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    if (!token) {
      openLogin();
    }
  }, [token]);

  if (!token) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>

        <Text style={{ color: colors.text, marginBottom: 20, textAlign: "center" }}>
          Debes iniciar sesión para usar el graficador
        </Text>

        <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
          <TouchableOpacity
            onPress={() => {
              triggerShake();
              openLogin();
            }}
            style={{
              backgroundColor: colors.primary,
              padding: 12,
              borderRadius: 10
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Iniciar sesión
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    );
  }

  const getRandomColor = () => {
    const palette = [
      "#00C2FF","#FF6B6B","#FFD93D","#6BCB77","#A66CFF",
      "#FF9F1C","#2EC4B6","#E71D36","#8338EC","#3A86FF"
    ];
    return palette[Math.floor(Math.random() * palette.length)];
  };

  const handleInput = (value: string) => {
    if (value === "=") {
      const result = evaluateExpression(expression);

      if (result.error) {
        setError(result.error);
        return;
      }

      const newFn = {
        fn: result.fn!,
        color: getRandomColor(),
        expr: expression,
        active: true
      };

      setFunctions((prev) => [newFn, ...prev]);
      setExpression("");
      setError(null);
      return;
    }

    setExpression((prev) => prev + value);
  };

  const handleDelete = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setExpression("");
    setError(null);
  };

  const removeFunction = (index: number) => {
    setFunctions((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleFunction = (index: number) => {
    setFunctions((prev) =>
      prev.map((f, i) =>
        i === index ? { ...f, active: !f.active } : f
      )
    );
  };

  return (
    
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Graficador</Text>

      <TextInput
        style={styles.input}
        placeholder="f(x) = ..."
        placeholderTextColor={colors.textMuted}
        value={expression}
        onChangeText={setExpression}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <GraphView fns={functions.filter(f => f.active)} />

      <ScrollView
        style={{ maxHeight: 100, marginTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {functions.map((f, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: colors.card,
              padding: 10,
              borderRadius: 10,
              marginBottom: 6,
              opacity: f.active ? 1 : 0.4
            }}
          >
            <Text
              style={{ color: f.color, flex: 1 }}
              onPress={() => toggleFunction(i)}
            >
              {f.expr}
            </Text>

            <Text
              style={{
                color: f.active ? "#00FFAA" : colors.textMuted,
                fontWeight: "bold",
                marginRight: 10
              }}
              onPress={() => toggleFunction(i)}
            >
              {f.active ? "ON" : "OFF"}
            </Text>

            <Text
              style={{
                color: colors.error,
                fontWeight: "bold",
                fontSize: 16
              }}
              onPress={() => removeFunction(i)}
            >
              ✕
            </Text>
          </View>
        ))}
      </ScrollView>

      <MathKeyboard
        onInput={handleInput}
        onDelete={handleDelete}
        onClear={handleClear}
      />     

</SafeAreaView>
  );
}