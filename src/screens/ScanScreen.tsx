import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CameraView } from "expo-camera";

export default function ScanScreen(){

return(

<View style={styles.container}>

<Text style={styles.title}>Scan Equation</Text>

<CameraView style={styles.camera}/>

<View style={styles.result}>
<Text style={styles.eq}>∫ (3x² + 2x + 1) dx</Text>
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
color:"#fff",
fontSize:20,
marginBottom:20
},

camera:{
height:320,
borderRadius:20,
overflow:"hidden"
},

result:{
marginTop:20,
backgroundColor:"#0D2A36",
padding:20,
borderRadius:12
},

eq:{
color:"#00C2FF",
fontSize:18
}

})
