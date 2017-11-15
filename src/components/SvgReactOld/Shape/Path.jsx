import React from 'react';

export default class Path extends React.Component {
  render() {
    return (
      <g className="visual-path">
        <path {...this.props} />
      </g>
    )
  }
}
