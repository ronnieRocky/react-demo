import React from 'react';
import Circle from './Circle';
import Rect from './Rect';
import Path from './Path';
import Line from './Line';


export default class Template extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShow : false,
    };
    this.handleclick = this.handleclick.bind(this);
  };
  
  handleclick(e){
        e.target.className==="cir" ?
        this.props.xx("cir"):
        this.props.xx("rect");
        ;
        
        this.setState({isShow : false})
  }

  render () {
    const show = this.props.isShow;
    return (
        show?
        <g className="template" >
            <circle className={"cir"} cx={"120"} cy={"10"} r={"10"} fill={"green"} stroke={"green"} onclick={this.handleclick} />
            <rect className={"rect"}  x={"90"} y={"50"} height={"15"} width={"20"} fill={"green"} stroke={"green"} onclick={this.handleclick} />
         </g>
         :null;
    )
  }
}

