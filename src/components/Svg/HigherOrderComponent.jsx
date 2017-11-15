import React from 'react';
import { Enhance } from './Enhance';

 class MyComponent extends React.Component {
     constructor(props){
         super(props);
     }

 render() {
   return (
       <g>
    </g>
   )
 }
}


export default Enhance(60, 60, MyComponent);
    // <circle className={"cir"} cx={"120"} cy={"90"} r={"10"} fill={"green"} stroke={"green"} />
    // <circle className={"cir"} cx={"180"} cy={"140"} r={"10"} fill={"green"} stroke={"green"} />