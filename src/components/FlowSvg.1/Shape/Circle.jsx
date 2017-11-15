import React from 'react';


export default class Circle extends React.Component {

  render() {
    return (
      <g className="visual-circle">
        <circle {...this.props} onClick={this.onClick} />
      </g>
    )
  }
}