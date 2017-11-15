
import React from 'react';
import Rect from './Rect';
import DraggableCore from 'react-draggable';

export default class Svg extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  
  onDragEnd(e, data) {
    const x = data.lastX;
    const y = data.lastY;
  }

  render() {
    return (
      <DraggableCore defaultPosition={{ x: 90, y: 90 }} onStop={this.onDragEnd} >
     
        // <h1>testsetse</h1>
      </DraggableCore>
    );
  }
}
