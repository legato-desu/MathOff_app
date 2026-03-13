import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function LibraryScreen() {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Library</Text>

      <Text style={styles.section}>Saved Graphs</Text>

      <View style={styles.cardRow}>

        <View style={styles.card}>
          <Text style={{color:"white"}}>y = x² + 2x + 1</Text>
        </View>

        <View style={styles.card}>
          <Text style={{color:"white"}}>y = sin(x)</Text>
        </View>

      </View>

      <Text style={styles.section}>Quick Learn</Text>

      <View style={styles.learnCard}>
        <Text style={{color:"white"}}>Linear Functions</Text>
      </View>

      <View style={styles.learnCard}>
        <Text style={{color:"white"}}>Quadratic Equations</Text>
      </View>

      <View style={styles.learnCard}>
        <Text style={{color:"white"}}>Trigonometry</Text>
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
    fontSize:24,
    marginBottom:20
  },

  section:{
    color:"#9cc",
    marginTop:10,
    marginBottom:10
  },

  cardRow:{
    flexDirection:"row",
    justifyContent:"space-between"
  },

  card:{
    width:"48%",
    height:120,
    backgroundColor:colors.card,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center"
  },

  learnCard:{
    backgroundColor:colors.card,
    padding:20,
    borderRadius:10,
    marginBottom:10
  }

});