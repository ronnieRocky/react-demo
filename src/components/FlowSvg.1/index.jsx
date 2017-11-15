import React from 'react';
import Rect from './Shape/Rect';
import Line from './Shape/Line';
import Circle from './Shape/Circle';
import Flow from './Flow';
import Node from './Node';
import Group from './Group';

export default class FlowSvg extends React.Component {

  render() {
    return (
     <div className="svg">
         <Flow x={150} y={50} direction={'vertical'} >
          <Group kind={"in"}>
            <Node shape={Rect} fill="white" width={240} stroke="red" />
          </Group>
          <Group kind={"rule"}>
            <Node shape={Rect} fill="white" width={100} stroke="blue" />
             </Group>
          <Group kind={"out"}>
            <Node shape={Rect} fill="white" width={500} stroke="black" />
          </Group>
        </Flow>
     </div>
    );
  }
}
