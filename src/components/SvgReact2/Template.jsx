import React from 'react';
// import Circle from './Circle';
import Rect from './Shape/Rect';
// import Path from './Path';
import Module from './Module';


export default class Template extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isShow: false,
    // };
    this.handleclick = this.handleclick.bind(this);
  }

  handleclick(e) {
    // console.log("handleclick");
    // e.target.className === "cir" ?
    //   this.props.ShapeChoice("cir") :
    //   this.props.ShapeChoice("rect");
    this.props.ShowTemplate(e.target.className.baseVal);
  }

  render() {
    const show = this.props.isShow;
    const { x, y } = this.props;
    return (
      <g className="template" >
        {
          show ?
            <Rect className={"rect"}  x={x} y={y} height={"15"} width={"20"}
              fill={"white"} stroke={"black"} onClick={this.handleclick} />
            :
            null
        }
      </g>
    )
  }
}

//  <circle className={"cir"} cx={"120"} cy={"10"} r={"10"} fill={"green"} stroke={"green"} onclick={this.handleclick} />
