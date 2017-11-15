import React from 'react';


export default class Circle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g className="visual-circle">
        <circle {...this.props} onClick={this.onClick} />
      </g>
    )
  }
}