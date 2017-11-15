import React from 'react';
import Rect from './Rect';

export default class SvgZoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [1, 0, 0, 1, 0, 0],
      dragging: false,
      scales: 0,
    };
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.pan = this.pan.bind(this);
  }

  onDragStart(e) {
    console.log("onDragStart");
    // Find start position of drag based on touch/mouse coordinates.
    const startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    const startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

    // Update state with above coordinates, and set dragging to true.
    const state = {
      dragging: true,
      startX,
      startY,
    };

    this.setState(state);
  }

  onDragMove(e) {
    console.log("onDragMove");
    // First check if the state is dragging, if not we can just return
    // so we do not move unless the user wants to move
    if (!this.state.dragging) {
      return;
    }

    // Get the new x coordinates
    const x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    const y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

    // Take the delta where we are minus where we came from.
    const dx = x - this.state.startX;
    const dy = y - this.state.startY;

    // Pan using the deltas
    this.pan(dx, dy);

    // Update the state
    this.setState({
      startX: x,
      startY: y,
    });
  }

  onDragEnd(e) {
    console.log("onDragEnd");
    this.setState({ dragging: false });
  }
  
  onWheel(e) {
    e.preventDefault();
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
    m[4] += (1 - scale) * this.props.width / 2;
    m[5] += (1 - scale) * this.props.height / 2;
    this.setState({ 
      matrix: m,
      scales: scale,
     });
  }

  render() {
    const { width, height } = this.props;
    const { scale } = this.state.scales;
    return (
      <div onWheel={this.onWheel}>
        <svg width={width} height={height}>
          <g
            transform={`matrix(${this.state.matrix.join(' ')})`}
          >
            {this.props.children}
          </g>
        </svg>
      </div>
    )
  }
}




//     x={ra.x} y={ra.y} height={ra.h} width={ra.w} fill={ra.fill} stroke={ra.stroke}
// x={rb.x} y={rb.y} height={rb.h} width={rb.w} fill={rb.fill} stroke={rb.stroke}
// x={rc.x} y={rc.y} height={rc.h} width={rc.w} fill={rc.fill} stroke={rc.stroke}