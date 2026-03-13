import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { colors } from "../theme/colors";

export default function GraphScreen() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>MathOff</Text>

      <TextInput
        style={styles.input}
        placeholder="f(x) = x^2"
        placeholderTextColor="#999"
      />

      <View style={styles.graph}>
        <Text style={{color:"white"}}>Graph Area</Text>
      </View>

      <View style={styles.keypad}>
        <Text style={{color:"white"}}>Keypad</Text>
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
    color:colors.text,
    fontSize:22,
    fontWeight:"bold",
    marginBottom:10
  },

  input:{
    backgroundColor:colors.card,
    padding:15,
    borderRadius:10,
    color:"white",
    marginBottom:20
  },

  graph:{
    height:200,
    backgroundColor:"#06151c",
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center"
  },

  keypad:{
    marginTop:30,
    height:200,
    backgroundColor:colors.card,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center"
  }

});