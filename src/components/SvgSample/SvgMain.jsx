
import React from 'react';
import Circle from './Shape/Circle';
import Rect from './Shape/Rect';
import Path from './Shape/Path';
import Line from './Shape/Line';
import Template from './Template';
import Container from './Container';


export default class SvgMain extends React.Component {
  constructor(){
    super();
    this.state = {
      showtemplate : false,
      dragging: false,
      startR : 30,
      container : [ <Circle className={"cir"} cx={"90"} cy={"90"} r={"30"} fill={"green"} stroke={"green"} />],
    };
    this.showtemplate = this.showtemplate.bind(this);
    this.ConClick = this.ConClick.bind(this);
  };

  showtemplate(con, bol){
    this.setState({
      container : [...this.state.container, ...con],
      showtemplate : bol,
    });
  }

  ConClick(baseX,baseY,temX,temY,bol){
        this.setState({
          showtemplate : bol,
          startX : baseX,
          startY : baseY,
          temX : temX,
          temY : temY,
        });
  }

  render() {
    const startX = this.state.startX;
    const startY = this.state.startY;
    const startR = this.state.startR;
    const temX = this.state.temX;
    const temY = this.state.temY;
    return (
          <g>
           <Container container={this.state.container} onconclick={this.ConClick} />
            {this.state.showtemplate?<Template startX ={startX} startY={startY} startR={startR} temX ={temX} temY={temY} ontemclick={this.showtemplate} />:null}
          </g>
    )
  }
}