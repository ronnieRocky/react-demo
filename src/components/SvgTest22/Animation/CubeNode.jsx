import React from 'react';
import './animation.less';

export default class CubeNode extends React.Component {

  render() {
    const {
      text,
      className,
      ...useStyles,
    } = this.props;

    return (
      <div className={className} style={useStyles}>
        { text }
      </div>);
  }
 }
