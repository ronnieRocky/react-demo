import { PropTypes } from 'react';
import React from 'react';


export default class Svg extends React.Component {
  
      constructor() {
        super();
      }

  render() {
    const { width, height } = this.props;
    return (
      <svg width={width} height={height}>
        {this.props.children}
      </svg>
    )
  }
}