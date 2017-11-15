import React from 'react';
import Rect from './Rect';

export default class Showcomponent extends React.Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.doRectMath = this.doRectMath.bind(this);
    };

    onClick(e){
        // console.log("123");
        // console.log(this.props.comp);
   
            const x = e.target.x.baseVal.value;
            const y = e.target.y.baseVal.value;
            const rh = e.target.height.baseVal.value;
            const rw = e.target.width.baseVal.value;
            //bx,by ,temx temy
            this.props.oncompClick(x+rw/2,y+rh,x+rw+30,y+10);
        // }
        
        
    }

doRectMath(){
    if(this.props.comp.props.className==="cir"){
        
        const x = this.props.comp.props.cx;
        const y = this.props.comp.props.cy;
        const r = this.props.comp.props.r;
        return {
                 x: x-r-10,
                 y: y-r-10,
                 rh: 2*r+20,
                 rw: 2*r+20
            };
    }
    if(this.props.comp.props.className ==="rect"){
        
        const x = this.props.comp.props.x;
        const y = this.props.comp.props.y;
        const rh = this.props.comp.props.height;
        const rw = this.props.comp.props.width;
        return {
                x: x-10,
                y: y-10,
                rh: rh+20,
                rw: rw+20
            };
    }
}

  render () {
    return (
      <g className="showcompoent">

       {this.props.comp}
        {
            this.props.comp.props.className==="rect" ?
            <rect className={"rect"} x={this.doRectMath().x} y={this.doRectMath().y} height={this.doRectMath().rh} width={this.doRectMath().rw} 
                fill={"green"} stroke={"green"} fillOpacity={0} onClick ={this.onClick} />:null
        }
        {
            this.props.comp.props.className==="cir"?
            <rect className={"rect"} x={this.doRectMath().x} y={this.doRectMath().y} height={this.doRectMath().rh} width={this.doRectMath().rw} 
                fill={"green"} stroke={"green"}  fillOpacity={0} onClick ={this.onClick}/>:null
        }
      </g>
    )
  }
}
// transform={`matrix(1 0 0 1 90 90)`} 