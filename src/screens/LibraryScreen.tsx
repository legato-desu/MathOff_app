import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SavedGraphCard from "../components/SavedGraphCard";

export default function LibraryScreen(){

return(

<View style={styles.container}>

<Text style={styles.title}>Libreria</Text>

<View style={styles.row}>
<SavedGraphCard title="y = 1 - x²"/>
<SavedGraphCard title="y = sin(x)"/>

</View>

</View>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#071A24",
padding:20
},

title:{
color:"#E8F6FF",
fontSize:24,
marginBottom:20
},

row:{
flexDirection:"row"
}

})
