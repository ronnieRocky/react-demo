import React from 'react';
import Rect from './Shape/Rect';

export default class SvgZoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [1, 0, 0, 1, 0, 0],
      dragging: false,
      scales: 0,
    };
    this.onWheel = this.onWheel.bind(this);
  }
  
  onWheel(e) {
    e.preventDefault();
    if (e.deltaY < 0) {
      this.zoom(1.05);
    } else {
      this.zoom(0.95);
    }
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