import React from 'react';
import Rect from './Rect';
import Line from './Line';
import DraggableCore from 'react-draggable';

export default class DragandZoom extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(e, data) {
    const x = data.lastX;
    const y = data.lastY;
    this.props.onDragging(e.target.id, x, y);
  }

  render() {
    const re = this.props.shape;
    return (
      <DraggableCore defaultPosition={{ x: re.x, y: re.y }} onStop={this.onDragEnd} >
        <g>
           <Rect id={re.id} x={re.x} y={re.y} height={re.h} width={re.w} fill={re.fill} stroke={re.stroke} />
            <image id="image0" width="100" height="100" x={re.x} y={re.y}
             xlinkHref="iconthink.jpg" />
        </g>
      </DraggableCore>
    );
  }
}
