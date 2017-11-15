import React from 'react';
import Circle from './Circle';
import Rect from './Rect';
import Path from './Path';
import Line from './Line';


export default class Template extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cirselected : false,
      rectselected : false,
    };

    this.onCirclick = this.onCirclick.bind(this);
    this.onRectclick = this.onRectclick.bind(this);

  };

onCirclick(){
    const container = [];
     let pd = "M"+(this.doPathMath().x)+" "+(this.doPathMath().y)+"l5 5 5-5z";
    container.push( <line x1={this.doLineMath().x1} y1={this.doLineMath().y1} x2={this.doLineMath().x2} y2={this.doLineMath().y2} stroke="black" /> );
    container.push( <path d={pd} /> );
    container.push( <circle className={"cir"} cx={this.doCirMath().cx} cy={this.doCirMath().cy} r={this.doCirMath().r} fill={"white"} stroke={"green"}/> );
    this.props.ontemclick(container,false);

    // this.setState({ cirselected : true });
}

onRectclick(){
    const container = [];
    let pd = "M"+(this.doPathMath().x)+" "+(this.doPathMath().y)+"l5 5 5-5z";
   container.push( <line x1={this.doLineMath().x1} y1={this.doLineMath().y1} x2={this.doLineMath().x2} y2={this.doLineMath().y2} stroke="black" /> );
    container.push( <path d={pd} /> );
    container.push( <rect  className={"rect"} x={this.doRectMath().x} y={this.doRectMath().y} height={this.doRectMath().rh} width={this.doRectMath().rw}/> );
    this.props.ontemclick(container,false);

    // this.setState({ rectselected : true });
}

doPathMath(){
    const x = this.props.startX;
    const y = this.props.startY;
    const r = this.props.startR;
    return {
        x: x-5,
        y : y+2*r
    };
}

doCirMath(){
    const x = this.props.startX;
    const y = this.props.startY;
    const r = this.props.startR;
    return {
        cx: x,
        cy: y+15+3*r,
        r : r,
    };
}

doRectMath(){
    const x = this.props.startX;
    const y = this.props.startY;
    const r = this.props.startR;
    return {
        x: x-50,
        y: y+2*r+15,
        rh: 100,
        rw: 100
    };
}

doTemCirMath(){
    return {
        cx: this.props.temX,
        cy: this.props.temY,
        r : this.props.startR-20,
    };
}

doTemRectMath(){
    return {
        x: this.props.temX-15,
        y: this.props.temY+20
    };
}

doLineMath(){
    const x = this.props.startX;
    const y = this.props.startY;
    const r = this.props.startR;
    return {
        x1: x,
        y1: y,
        x2 : x,
        y2 : y+2*r
    };
}

  render () {

    return (
        <g className="template">
           <circle cx={this.doTemCirMath().cx} cy={this.doTemCirMath().cy} r={this.doTemCirMath().r} fill={"white"} stroke={"green"} onClick={this.onCirclick} />
           <rect x={this.doTemRectMath().x} y={this.doTemRectMath().y} height={"20"} width={"30"} fill={"white"} stroke={"green"} onClick={this.onRectclick} />
        </g>
    )
  }
}


        //    <circle cx={cx} cy={cy} r={r} fill={"white"} stroke={"green"} onClick={this.onCirclick} />