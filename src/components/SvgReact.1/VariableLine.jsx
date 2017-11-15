import React from 'react';
import Line from './Shape/Line';

export default class VariableLine extends React.Component {
//   static defaultProps = {
//    x: 0,
//    y: 0,
//  };

  constructor(props) {
    super(props);
    this.state = {
      defaultlinelength: 100,
    };
  }

  render() {
    const { fx, fy, offset } = this.props;
    return (
        <Line x1={fx} y1={fy}
          x2={fx} y2={fy + this.state.defaultlinelength + offset}
          stroke="green" />
    )
  }
}

