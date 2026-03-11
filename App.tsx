import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';

export default function App() {
  const [functionInput, setFunctionInput] = useState('x^2');
  const [data, setData] = useState<{ x: number; y: number }[]>([]);

  const generateData = () => {
    const points: { x: number; y: number }[] = [];
    const expr = functionInput.replace(/\^/g, '**');

    for (let x = -10; x <= 10; x += 0.5) {
      try {
        const y = eval(expr.replace(/x/g, `(${x})`));
        points.push({ x, y });
      } catch (error) {
        console.error("Error evaluando la función:", error);
      }
    }

    setData(points);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MathOff - Graficador</Text>
      <TextInput
        style={styles.input}
        value={functionInput}
        onChangeText={setFunctionInput}
        placeholder="Ej: x^2, x^3, x+5"
      />
      <Button title="Graficar" onPress={generateData} />
      <VictoryChart domain={{ x: [-10, 10], y: [-100, 100] }} width={300} height={200}>
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryLine
          data={data}
          x="x"
          y="y"
          style={{
            data: { stroke: "blue", strokeWidth: 2 },
          }}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    textAlign: 'center',
  },
});
