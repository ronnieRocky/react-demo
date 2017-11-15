import React from 'react';

export default class Line extends React.Component {
  render () {
    return (
       <g className="visual-line">
        <line  {...this.props} />
      </g>
    )
  }
}