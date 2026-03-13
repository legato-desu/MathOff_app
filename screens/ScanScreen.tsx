import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function ScanScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Scan Equation</Text>

      <View style={styles.cameraBox}>
        <Text style={{color:"white"}}>Camera Preview</Text>
      </View>

      <View style={styles.result}>
        <Text style={{color:"white"}}>∫ (3x² + 2x + 1) dx</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:colors.background,
    padding:20
  },

  title:{
    color:"white",
    fontSize:20,
    marginBottom:20
  },

  cameraBox:{
    height:300,
    backgroundColor:"#06151c",
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center"
  },

  result:{
    marginTop:20,
    padding:20,
    backgroundColor:colors.card,
    borderRadius:10
  }

});