import React from 'react';
import HigherOrderComponent from './HigherOrderComponent';
import Circle from './Circle';

export default class Direct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [1, 0, 0, 1, 0, 0],
    };
  }

  render() {
    const { x, y } = this.props;
    const matrix = [1, 0, 0, 1, x, y];
    return (
          <g transform={`matrix(${matrix.join(' ')})`}>
             {this.props.children}
          </g>
    )
  }
}
