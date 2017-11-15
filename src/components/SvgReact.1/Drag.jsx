import React from 'react';
import Rect from './Shape/Rect';
import Line from './Shape/Line';
import DraggableCore from 'react-draggable';
import Template from './Template';

export default class Drag extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }


  onDragEnd(e, data) {
    const x = data.lastX;
    const y = data.lastY;
    const ex = e.target.x.baseVal.value;
    const ey = e.target.y.baseVal.value;
    //temp x y
    this.props.onDragEnd(x + ex + 60, y + ey);
    this.props.onDragging(e.target.id, x, y);
  }

  onClick(e) {
    this.props.onClick(e.target.id);
  }

  onDrag() {
    this.props.onDrag(false);
  }

  render() {
    const shape = this.props.shape;
    // const bol = this.props.bol;
    const bol = true;
    return (
      <g>
               { shape }
      </g>
    );
  }
}
  // <Rect id={re.id} x={re.x} y={re.y} height={re.h} width={re.w}
  //               fill={re.fill} stroke={re.stroke}
  //             />
  //  { shape }

      // <g>
      //     <DraggableCore
      //       defaultPosition={{ x: shape.props.x, y: shape.props.y }}
      //       onStop={this.onDragEnd}
      //       onDrag={this.onDrag}
      //       disabled={bol}
      //     >
      //       <g onClick={this.onClick}>
      //          { shape }
      //       </g>
      //     </DraggableCore>
      // </g>