import React from 'react';

export default class Ch extends React.Component {
  componentDidMount() {
    console.log("componentDidMount");
    console.log(this.refs.ss.getBoundingClientRect());
    console.log(this.refs.ss.getBBox());
    const width = this.refs.ss.getBBox().width;
    const height = this.refs.ss.getBBox().height;
    this.props.onflash(width, height);
  }
  render() {
    return (
         <g ref ="ss" >
            <rect x="5" y="5" width="50" height="50" fill="none" stroke="green" fillOpacity='0.2' />
            <circle cx="10" cy="6" r="3" fill="none" stroke="green" fillOpacity='0.2' />
         </g>
    )
  }
}
