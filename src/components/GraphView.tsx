import React from "react";
import { View } from "react-native";
import Svg, { Path, Line } from "react-native-svg";

export default function GraphView(){

return(

<View style={{height:220}}>

<Svg height="220" width="100%">

<Line x1="0" y1="110" x2="400" y2="110" stroke="#2f4c59"/>

<Line x1="200" y1="0" x2="200" y2="220" stroke="#2f4c59"/>

<Path
d="M0 180 Q200 20 400 180"
stroke="#00C2FF"
strokeWidth="3"
fill="none"
/>

</Svg>

</View>

)

}
