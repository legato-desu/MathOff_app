import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import GraphView from "../components/GraphView";
import MathKeyboard from "../components/MathKeyboard";
import { colors } from "../theme/colors";

export default function GraphScreen(){

return(

<View style={styles.container}>

<Text style={styles.title}>Graficador</Text>

<TextInput
style={styles.input}
placeholder="f(x) = 1-x²"
placeholderTextColor="#888"
/>

<GraphView/>

<MathKeyboard/>

</View>

)

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
marginBottom:10
},

input:{
backgroundColor:colors.card,
padding:15,
borderRadius:10,
color:"white",
marginBottom:10
}

})
