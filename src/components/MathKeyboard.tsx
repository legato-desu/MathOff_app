import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const keys = [
["sin","cos","tan","π","√"],
["x","7","8","9","+"],
["y","4","5","6","x"],
["^","1","2","3","-"],
["("," )","0",".","="]
];

export default function MathKeyboard(){

return(

<View style={styles.container}>

{keys.map((row,i)=>(
<View key={i} style={styles.row}>

{row.map((k)=>(
<TouchableOpacity key={k} style={styles.key}>
<Text style={styles.text}>{k}</Text>
</TouchableOpacity>
))}

</View>
))}

</View>

)

}

const styles = StyleSheet.create({

container:{
marginTop:20
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10
},

key:{
backgroundColor:"#123847",
padding:15,
borderRadius:10,
width:"18%",
alignItems:"center"
},

text:{
color:"#E8F6FF"
}

})
