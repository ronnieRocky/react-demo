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
            <Flow x={150} y={50} direction={'horizontal'} onFlow={() => {}}>
              <Group kind={"in"}>
                <Node shape={Rect} width={100} height={60} />
                <Node shape={Rect} width={40} height={160} />
              </Group>
              <Group kind={"rule"}>
                <Node shape={Rect} fill="none" width={70} height={70} stroke="orange" />
              </Group>
              <Group kind={"out"}>
                <Node shape={Rect} fill="none" stroke="black" />
                <Node shape={Rect} width={100} height={60} />
              </Group>
            </Flow>
        </div>
    );
  }
}
