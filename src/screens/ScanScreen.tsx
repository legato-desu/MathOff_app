import React from "react";
import { View, Text } from "react-native";
import { CameraView } from "expo-camera";
import { useTheme } from "../theme/ThemeContext";

export default function ScanScreen(){

  const { colors } = useTheme();

  return(
    <View style={{
      flex:1,
      backgroundColor: colors.background,
      padding:20
    }}>

      <Text style={{
        color: colors.text,
        fontSize:20,
        marginBottom:20
      }}>
        Escanear Ecuaciones
      </Text>

      <CameraView style={{
        height:320,
        borderRadius:20,
        overflow:"hidden"
      }}/>

      <View style={{
        marginTop:20,
        backgroundColor: colors.card,
        padding:20,
        borderRadius:12
      }}>
        <Text style={{
          color: colors.primary,
          fontSize:18
        }}>
          ∫ (3x² + 2x + 1) dx
        </Text>
      </View>

    </View>
  );
}