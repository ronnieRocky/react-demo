import React from 'react';
import Rect from './Shape/Rect';
import Line from './Shape/Line';
import Circle from './Shape/Circle';
import Flow from './Flow';
import Node from './Node';
import Group from './Group';
import NodeHori from './NodeHori';

export default class FlowSvg extends React.Component {

  render() {
    return (
     <div className="svg">
         <Flow x={50} y={50} direction={'vertical'} >
          <Group kind={"in"}>
            <Node shape={Rect} fill="white" stroke="red" />
          </Group>
          <Group kind={"in"}>
            <Node shape={Rect} fill="white" width={70} stroke="blue" />
            <Node shape={Rect} fill="white" width={70} stroke="blue" />
          </Group>
        </Flow>
     </div>
    );
  }
}

    // const horiLineTot = {
    //   in: [{ x: 139, y: 90 }, { x: 139, y: 270 }],
    //   rule: {
    //     left: { x: 380, y: 205 },
    //     right: { x: 460, y: 205 },
    //   },
    //   out: [{ x: 680, y: 205 }, { x: 680, y: 385 }],
    // };
    // const ss = this.onHorizontalLine(horiLineTot);