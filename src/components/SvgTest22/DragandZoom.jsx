import React from 'react';
import SvgMain from './SvgMain';

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
    this.pan = this.pan.bind(this);
  }

  onDragStart(e) {
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

  onDragEnd() {
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
    m[4] += (1 - scale) *this.props.width / 2;
    m[5] += (1 - scale) * this.props.height / 2;
    this.setState({ matrix: m });
  }

  render() {
    const { minX, minY, width, height, ...others } = this.props;
    return (
      <svg
        height={height}
        width={width}
        >
        <g transform={`matrix(${this.state.matrix.join(' ')})`}
            onMouseDown={this.onDragStart}
            onTouchStart={this.onDragStart}
            onMouseMove={this.onDragMove}
            onTouchMove={this.onDragMove}
            onMouseUp={this.onDragEnd}
            onTouchEnd={this.onDragEnd}
            onWheel={this.onWheel}
        >
          <SvgMain />
        </g>
      </svg>
    );
  }
}



