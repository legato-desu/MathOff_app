import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";

import GraphView from "../components/GraphView";
import MathKeyboard from "../components/MathKeyboard";

import { useTheme } from "../theme/ThemeContext";
import { createStyles } from "../styles/graph.styles";

import { evaluateExpression } from "../utils/math.utils";

export default function GraphScreen() {

  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [expression, setExpression] = useState("");
  const [functions, setFunctions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getRandomColor = () => {
    const palette = [
      "#00C2FF",
      "#FF6B6B",
      "#FFD93D",
      "#6BCB77",
      "#A66CFF",
      "#FF9F1C",
      "#2EC4B6",
      "#E71D36",
      "#8338EC",
      "#3A86FF"
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
    <View style={styles.container}>

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

    </View>
  );
}