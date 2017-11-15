import React from 'react';
import Rect from './Shape/Rect';
export default class ShowShape extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const module = this.props.shape;
    return (
        module
    )
  }
}

  // <Rect id={"module.id"} x={100} y={30} height={h} width={w}
  //         fill={fill} stroke={stroke}
  //       />