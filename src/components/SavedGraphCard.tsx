import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
title:string
}

export default function SavedGraphCard({title}:Props){

return(

<View style={styles.card}>
<Text style={styles.text}>{title}</Text>
</View>

)

}

const styles = StyleSheet.create({

card:{
width:150,
height:120,
backgroundColor:"#0D2A36",
borderRadius:14,
justifyContent:"center",
alignItems:"center",
marginRight:10
},

text:{
color:"#E8F6FF"
}

})
