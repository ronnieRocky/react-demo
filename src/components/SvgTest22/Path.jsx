
import React from 'react';

export default class Path extends React.Component {
  render() {
    const style = {
      stroke: 'green',
      fill: 'green',
      markerEnd: 'url(#markerArrow)',
    };
    const { bx, by, ex, ey } = this.props;
    return (
      <g className="visual-line">
        <line {...this.props} />
        <defs>
          <marker
            id="markerArrow"
            markerWidth="10"
            markerHeight="10"
            refX="0" refY="2"
            orient="auto"
          >
            <path d="M0,0 L10,2 L0,4 L0,0" />
          </marker>
        </defs>
        <path d={ `M${bx},${by} L${ex},${ey}` } style={style} />
      </g>
    )
  }
}
