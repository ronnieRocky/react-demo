import React from 'react';
import Rect from './Rect';
import Line from './Line';

export default class DragandZoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [1, 0, 0, 1, 0, 0],
      dragging: false,
    };
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.test = this.test.bind(this);
    // this.pan = this.pan.bind(this);
  }

  onDragStart(e) {
    // Find start position of drag based on touch/mouse coordinates.
    const startX =  e.clientX;
    const startY =  e.clientY;
console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVm")
  console.log(e.clientX);
  console.log(e.clientY);
    // Update state with above coordinates, and set dragging to true.
    const state = {
      dragging: true,
      startX,
      startY,
    };

    this.setState(state);
  }

  onDragMove(e) {
    // First check if the state is dragging, if not we can just return
    // so we do not move unless the user wants to move
    if (!this.state.dragging) {
      return;
    }
console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmm")
  console.log(e.pageX);
  console.log(e.pageY);
    // Get the new x coordinates
    // const x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    // const y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
    const x = e.clientX;
    const y = e.clientY;

    // Take the delta where we are minus where we came from.
    const dx = x - this.state.startX;
    const dy = y - this.state.startY;
    // const dx = x;
    // const dy = y;

    // Pan using the deltas
    this.pan(dx, dy);
    // const m = this.state.matrix.translate(dx, dy).multiply(this.state.matrix);

    // Update the state
    this.setState({
      startX: x,
      startY: y,
    });
  }


test(e){
  // console.log(e.pageX);
  // console.log(e.pageY);
  console.log("=============================================");
  console.log(e.pageX);
  console.log(e.pageY);

  //   const dx = e.pageX-50-this.state.startX;
  //   const dy = e.pageY-50-this.state.startY;
  //   // const dx = x;
  // console.log(dx);
  // console.log(dy);
  //   // const dy = y;

  //   // Pan using the deltas
  //   // 
  //    this.pan(dx, dy);
  //   // const m = this.state.matrix.translate(dx, dy).multiply(this.state.matrix);
    // this.setState({
    //    dragging: false,
    //   // startX: dx,
    //   // startY: dy,
    // });
  this.onDragMove(e);
}

  onDragEnd(e) {
    console.log(this.state.matrix);
    const sx = this.props.shape.x;
    const sy = this.props.shape.y;
    const x = this.state.matrix[4];
    const y = this.state.matrix[5];
    this.props.onDragging(e.target.id, x, y, sx, sy);
    this.setState({ dragging: false });
  }

  onWheel(e) {
    if (e.deltaY < 0) {
      this.zoom(1.05);
    } else {
      this.zoom(0.95);
    }
  }

  pan(dx, dy) {
    const m = this.state.matrix;
    m[4] += dx;
    m[5] += dy;
    this.setState({ matrix: m });
  }

  zoom(scale) {
    const m = this.state.matrix;
    const len = m.length;
    for (let i = 0; i < len; i++) {
      m[i] *= scale;
    }
    m[4] += (1 - scale) * this.props.shape.w / 2;
    m[5] += (1 - scale) * this.props.shape.h / 2;
    this.setState({ matrix: m });
  }

  componentWillMount() {
    const m = this.state.matrix;
    m[4] += this.props.shape.x;
    m[5] += this.props.shape.y;
    this.setState({ matrix: m });
  }

  render() {
    const re = this.props.shape;
    return (
        <g transform={`matrix(${this.state.matrix.join(' ')})`}
          onMouseDown={this.onDragStart}
          onMouseMove={this.onDragMove}
          onMouseUp={this.onDragEnd}
          onWheel={this.onWheel}
          onMouseOut  ={e=>this.test(e)} 
        onTouchStart={this.onDragStart}
        onTouchMove={this.onDragMove}
        onTouchEnd={this.onDragEnd}
        >

        <Rect id={re.id} x={re.x} y={re.y} height={re.h} width={re.w} fill={re.fill} stroke={re.stroke} />
        </g>

    );
  }
}


//
        // <Line id={re.id} x1={re.x+90} y1={re.y+90} x2={re.x+150} y2={re.y+150}  stroke={re.stroke} />

//     x={ra.x} y={ra.y} height={ra.h} width={ra.w} fill={ra.fill} stroke={ra.stroke}
// x={rb.x} y={rb.y} height={rb.h} width={rb.w} fill={rb.fill} stroke={rb.stroke}
// x={rc.x} y={rc.y} height={rc.h} width={rc.w} fill={rc.fill} stroke={rc.stroke}
