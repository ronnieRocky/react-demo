import React from 'react';
import Rect from './Shape/Rect';
import Line from './Shape/Line';
import Circle from './Shape/Circle';
import Flow from './Flow';
import Node from './Node';

export default class FlowSvg extends React.Component {

  render() {
    // console.log(this.props);
    // const { x, y } = this.props;
    return (
     <div className="svg">
        <Flow x={50} y={50} direction={'horizontal'} >
          <Node shape={Rect} />
          <Node fill="white" stroke="green" shape={Rect} offset={100} />
          <Node fill="white" stroke="red" width={60} height={100} shape={Rect} />
        </Flow>
     </div>
    );
  }
}
// <Node fill="white" stroke="yellow" width={200} height={300} shape={Rect} />
         
