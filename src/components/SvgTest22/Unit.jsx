import React from 'react';
import SvgMain from './SvgMain';
import Showcomponent from './Showcomponent';
import Template from './Template';

export default class Unit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [1, 0, 0, 1, 0, 0],
      dragging: false,
      showtemplate: false,
      x: 0,
      y: 0,
      r: 30,
      cwh: 80,
      rwh: 100,
      elecontainer : ["1"],
    };
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.pan = this.pan.bind(this);
    this.ontransform = this.ontransform.bind(this);
    this.showtemplate = this.showtemplate.bind(this);
  }

  onDragStart(e) {
    console.log(e.target);
    // Find start position of drag based on touch/mouse coordinates.
    const startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    const startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

    // Update state with above coordinates, and set dragging to true.
    const state = {
      dragging: true,
      startX,
      startY,
    };

    this.setState(state);
  }

  onDragMove(e) {
    // First check if the state is dragging, if not we can just return
    // so we do not move unless the user wants to move
    if (!this.state.dragging) {
      return;
    }

    // Get the new x coordinates
    const x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
    const y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

    // Take the delta where we are minus where we came from.
    const dx = x - this.state.startX;
    const dy = y - this.state.startY;

    // Pan using the deltas
    this.pan(dx, dy);

    // Update the state
    this.setState({
      startX: x,
      startY: y,
    });
  }

  onDragEnd() {
    this.setState({ dragging: false });
  }

  onMath(type){
      let num = 50;
      let sx = this.state.matrix[4]+num;
      let sy = this.state.matrix[5]+num;
      let cwh = this.state.cwh;
      let rwh = this.state.rwh;
     
      type==="cir"?this.onTBLR(sx,sy,cwh):this.onTBLR(sx,sy,rwh);

  }

   onTBLR(x,y,wh){
    (x,y,wh)=>{
      let top = (x,y,wh)=>{
          let tx = x+wh/2;
          let ty = y;
          return {x: tx,y: ty};
        };
      let button = (x,y,wh)=>{
          let bx = x+wh/2;
          let by = y+wh;
          return {x: bx,y: by};
        };
      let left = (x,y,wh)=>{
          let lx = x;
          let ly = y+wh/2;
          return {x: lx,y: ly};
        };
      let right = (x,y,wh)=>{
          let rx = x+wh;
          let ry = y+wh/2;
          return {x: rx,y: ry};
        };
      return {top: top,button: button,left: left,rigth: right};
     };
  }
  
  onWheel(e) {
    if (e.deltaY < 0) {
      this.zoom(1.05);
    } else {
      this.zoom(0.95);
    }
  }

  pan(dx, dy) {
    const m = this.state.matrix;
    m[4] += dx;
    m[5] += dy;
    this.setState({ matrix: m });
  }

  zoom(scale) {
    const m = this.state.matrix;
    const len = m.length;
    for (let i = 0; i < len; i++) {
      m[i] *= scale;
    }
    m[4] += (1 - scale) *this.props.width / 2;
    m[5] += (1 - scale) * this.props.height / 2;
    this.setState({ matrix: m });
  }

  showtemplate(con, bol){
    const elecon = [];
    elecon.push(this.state.elecontainer.length+1);
    console.log(this.state.elecontainer);
    console.log(elecon);
    this.props.oncontainer(con);
    this.setState({
      showtemplate : bol,
      elecontainer : [...this.state.elecontainer,...elecon],
    });
  }

    ontransform(x,y,tx,ty){
        // this.props.ontransform(x,y,tx,ty,this.state.matrix);
        // console.log(this.state.matrix);
        this.setState({ 
            x: x,
            y: y,
            tx: tx,
            ty: ty,
            showtemplate : !this.state.showtemplate,

        });
    }

  render() {
    let num = 1;
    let id = this.state.elecontainer.length;
    // console.log(id);
    const { minX, minY, width, height, ...others } = this.props;
    return (
    
        <g className="group">
            <g className="element" transform={`matrix(${this.state.matrix.join(' ')})`}
                onMouseDown={this.onDragStart}
                onTouchStart={this.onDragStart}
                onMouseMove={this.onDragMove}
                onTouchMove={this.onDragMove}
                onMouseUp={this.onDragEnd}
                onTouchEnd={this.onDragEnd}
                onWheel={this.onWheel}
            >
                {this.state.showtemplate ? <Template startX ={this.state.x} startY={this.state.y} startR={this.state.r} temX ={this.state.tx} temY={this.state.ty} ontemclick={this.showtemplate} />:null}
        
                <Showcomponent id={id} key={num++} comp={this.props.component} oncompClick={this.ontransform} />
            </g>
        </g>
    );
  }
}



