import React from 'react';
import Circle from './Shape/Circle';
import Rect from './Shape/Rect';
// import Path from './Path';
import Module from './Module';


export default class Plus extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isShow: false,
    // };
    this.handleclick = this.handleclick.bind(this);
  }

  handleclick(e) {
    this.props.onadd(e.target.id);
  }

  render() {
    // const show = this.props.isShow;
    const { id, cx, cy } = this.props;
    return (
      <g className="plus" >
              <circle id={id} className={"cir"} cx={cx} cy={cy}
               r={"10"} fill={"white"} stroke={"green"}
               onClick={this.handleclick} />

      </g>
    )
  }
}
//  <circle className={"cir"} cx={"120"} cy={"10"} r={"10"} fill={"green"} stroke={"green"} onclick={this.handleclick} />

            // <Rect className={"rect"} x={x} y={y} height={"10"} width={"10"}
            //   fill={"white"} stroke={"black"} onClick={this.handleclick} />