import React, { useState, useRef, useMemo } from "react";
import { View } from "react-native";
import Svg, { Path, Line, Text as SvgText } from "react-native-svg";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { useTheme } from "../theme/ThemeContext";
import { styles } from "../styles/graphView.styles";

type FnType = {
  fn: (x: number) => number;
  color: string;
};

type Props = {
  fns: FnType[];
};

export default function GraphView({ fns }: Props) {

  const { colors } = useTheme();

  const width = 400;
  const height = 220;

  const [scale, setScale] = useState(20);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const scaleRef = useRef(20);
  const offsetRef = useRef({ x: 0, y: 0 });

  const centerX = width / 2 + offset.x;
  const centerY = height / 2 + offset.y;

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      let newScale = scaleRef.current * e.scale;
      newScale = Math.max(5, Math.min(100, newScale));
      setScale(newScale);
    })
    .onEnd(() => {
      scaleRef.current = scale;
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const newOffset = {
        x: offsetRef.current.x + e.translationX,
        y: offsetRef.current.y + e.translationY,
      };
      setOffset(newOffset);
    })
    .onEnd(() => {
      offsetRef.current = offset;
    });

  const gesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const paths = useMemo(() => {
    return fns.map(({ fn, color }) => {

      let path = "";
      let first = true;

      for (let px = 0; px < width; px++) {
        const x = (px - centerX) / scale;

        let y;
        try {
          y = fn(x);
        } catch {
          continue;
        }

        if (typeof y !== "number" || isNaN(y)) continue;

        const py = centerY - y * scale;

        if (first) {
          path += `M ${px} ${py}`;
          first = false;
        } else {
          path += ` L ${px} ${py}`;
        }
      }

      return { path, color };
    });

  }, [fns, scale, offset]);

  const drawGrid = () => {
    const lines = [];
    const step = scale;

    for (let x = centerX % step; x < width; x += step) {
      lines.push(
        <Line key={`v-${x}`} x1={x} y1="0" x2={x} y2={height} stroke={colors.border} strokeWidth="0.5" />
      );
    }

    for (let y = centerY % step; y < height; y += step) {
      lines.push(
        <Line key={`h-${y}`} x1="0" y1={y} x2={width} y2={y} stroke={colors.border} strokeWidth="0.5" />
      );
    }

    return lines;
  };

  const drawAxisLabels = () => {
    const labels = [];

    let step = scale;
    if (scale < 15) step = scale * 2;
    if (scale < 10) step = scale * 4;

    for (let px = centerX % step; px < width; px += step) {
      const value = (px - centerX) / scale;
      if (Math.abs(value) < 0.001) continue;

      labels.push(
        <SvgText
          key={`x-${px}`}
          x={px}
          y={centerY + 15}
          fontSize="10"
          fill={colors.text} // 🔥 dinámico
          textAnchor="middle"
        >
          {scale > 30 ? value.toFixed(1) : Math.round(value)}
        </SvgText>
      );
    }

    for (let py = centerY % step; py < height; py += step) {
      const value = (centerY - py) / scale;
      if (Math.abs(value) < 0.001) continue;

      labels.push(
        <SvgText
          key={`y-${py}`}
          x={centerX + 5}
          y={py}
          fontSize="10"
          fill={colors.text} // 🔥 dinámico
        >
          {scale > 30 ? value.toFixed(1) : Math.round(value)}
        </SvgText>
      );
    }

    return labels;
  };

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Svg height={height} width={width}>

          {drawGrid()}
          {drawAxisLabels()}

          <Line x1="0" y1={centerY} x2={width} y2={centerY} stroke={colors.textSecondary} />
          <Line x1={centerX} y1="0" x2={centerX} y2={height} stroke={colors.textSecondary} />

          {paths.map((p, i) => (
            <Path
              key={i}
              d={p.path}
              stroke={p.color}
              strokeWidth="2"
              fill="none"
            />
          ))}

        </Svg>
      </GestureDetector>
    </View>
  );
}