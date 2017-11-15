import React from 'react';

export default class Pr extends React.Component {
  render () {
    return (
          <g className="visual-rect">
              <rect {...this.props} />
          </g>
    )
  }
}