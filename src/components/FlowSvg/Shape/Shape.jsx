import React from 'react';

export default class Shape extends React.Component {

  componentDidMount() {
    const width = this.refs.group.getBBox().width;
    const height = this.refs.group.getBBox().height;
    this.props.onflash(width, height);
  }

  render() {
    const { shape } = this.props;
    return (
      shape()
    )
  }
}
