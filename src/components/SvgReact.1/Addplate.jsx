import React from 'react';
// import Circle from './Circle';
import Rect from './Shape/Rect';
// import Path from './Path';
import Module from './Module';


export default class Addplate extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isShow: false,
    // };
    this.handleclick = this.handleclick.bind(this);
  }

  handleclick(e) {
    this.props.showTemplate(e.target.className.baseVal);
  }

  render() {
    // const show = this.props.isShow;
    const { x, y } = this.props;
    return (
      <g className="addplate" >
            <Rect className={"rect"} x={x} y={y} height={"10"} width={"10"}
              fill={"white"} stroke={"black"} onClick={this.handleclick} />
      </g>
    )
  }
}
//  <circle className={"cir"} cx={"120"} cy={"10"} r={"10"} fill={"green"} stroke={"green"} onclick={this.handleclick} />
