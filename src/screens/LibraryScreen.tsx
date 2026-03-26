import React from "react";
import { View, Text } from "react-native";
import SavedGraphCard from "../components/SavedGraphCard";
import { useTheme } from "../theme/ThemeContext";

export default function LibraryScreen(){

  const { colors } = useTheme();

  return(
    <View style={{
      flex:1,
      backgroundColor: colors.background,
      padding:20
    }}>

      <Text style={{
        color: colors.text,
        fontSize:24,
        marginBottom:20
      }}>
        Libreria
      </Text>

      <View style={{ flexDirection:"row" }}>
        <SavedGraphCard title="y = 1 - x²"/>
        <SavedGraphCard title="y = sin(x)"/>
      </View>

    </View>
  );
}