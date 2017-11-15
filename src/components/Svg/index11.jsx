import React from 'react';
import Draggable from 'react-draggable';
import HigherOrderComponent from './HigherOrderComponent';
import Circle from './Circle';
import { OutEnhance } from './OutEnhance';

 // App
export default class Svg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [1, 0, 0, 1, 0, 0],
      fill: 'green',
      stroke: 'green',
      width: 50,
      height: 50,
      r: 2,
    };
  }

  render() {
    const fill = this.state.fill;
    const stroke = this.state.stroke;
    const r = this.state.r;
    const Comp = OutEnhance(0, 0)(Circle);
    return (
      <div>
        <Comp className={"cir"} cx={"120"} cy={"90"} r={r} fill={fill} stroke= {stroke} />
      </div>
    )
  }
}


        // <Circle className={"cir"} cx={"120"} cy={"90"} r={r} fill={fill} stroke= {stroke} />

