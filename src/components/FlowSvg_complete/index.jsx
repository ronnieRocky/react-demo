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
            <Flow x={150} y={50} direction={'horizontal'} >
              <Group kind={"in"}>
                <Node shape={Rect} fill="rgb(255,140,0)" width={100} height={60} stroke="green" />
                <Node shape={Rect} fill="rgb(255,140,0)" width={60} height={60} stroke="green" />
              </Group>
              <Group kind={"rule"}>
                <Node shape={Rect} fill="gray" width={70} height={70} stroke="orange" />
              </Group>
              <Group kind={"out"}>
                <Node shape={Rect} fill="rgb(85,170,0)" stroke="black" />
                <Node shape={Rect} fill="rgb(85,170,0)" stroke="black" />
                <Node shape={Rect} fill="rgb(85,170,0)" width={70} height={70} stroke="black" />
              </Group>
            </Flow>
        </div>
    );
  }
}
