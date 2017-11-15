
import React from 'react';
import Rect from './Shape/Rect';
import Module from './Module';
import DragandZoom from './DragandZoom';
import Line from './Shape/Line';
import Path from './Shape/Path';
import { getTempcom, onDirect, onLineMath, onMiddleMath, onDirectMath, onTBLR, onPathTBLR } from './utils/Math';
import { rendomId, moduleFactory } from './utils/Func';
import Template from './Template';
import UpdateContainer from './UpdateContainer';

// var temid;
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      totalContainer: [],
      moduleContainer: [],
      lineContainer: [],
      firstId: "",
      clickId: "",
      lastId: "",
      x: 0,
      y: 0,
    };
    this.updateContainer = this.updateContainer.bind(this);
  }
  

  updateContainer(type){

    const modcon= this.state.moduleContainer;
    let totcon= this.state.totalContainer;
    const lastmodule = modcon[modcon.length-1];
    const fid = this.state.firstId;
    const cid = this.state.clickId;
    const lid = this.state.lastId;
    if(fid===cid){
      if(lastmodule.link.length!==0){
       return;
      }
    }else{
      if(cid!==lid){
        return;
      }
    }
    const newmodule= moduleFactory(type, lastmodule.mx, lastmodule.my+70);

    if (lastmodule.locale !== "start") {
      lastmodule.locale = "";
    }
    newmodule.locale = "last";
    if (modcon.length === 0) {
      return modcon;
    }
    modcon.push(newmodule);
    lastmodule.link.push(newmodule);
    lastmodule.connect.push({ key: newmodule.id, value:[] });
    newmodule.link.push(lastmodule);
    newmodule.connect.push({ key: lastmodule.id, value:[] });
    // totcon.push(<DragandZoom shape={newmodule}  onDragEnd={this.onDragEnd} onDrag={this.onDrag} onDragging={this.onDragging}  onClick={this.click} />);
    totcon=[...totcon, ...this.upcon(newmodule)];
    this.onDragging(lastmodule.id,lastmodule.mx,lastmodule.my);
    this.setState({
      totalContainer: [...totcon],
      moduleContainer: [...modcon],
      isShow : false,
      lastId: newmodule.id,
    });
  }

  upcon(firstModule){
    const con =[];
    con.push(<UpdateContainer module={firstModule} />);
    return con;
  }

  componentWillMount() {
    const modcon = [];
    const firstModule= moduleFactory('rect', 100, 30);
    firstModule.locale = 'start';
    modcon.push(firstModule);
    // totcon.push(<DragandZoom shape={firstModule} onDragEnd={this.onDragEnd} onDrag={this.onDrag} onDragging={this.onDragging} onClick={this.click}  />);

    const totcon = this.upcon(firstModule);

    this.setState({
      totalContainer: [...totcon],
      moduleContainer: [...modcon],
      firstId:  firstModule.id,
    });
  }

  render() {
    return (
      <g className="MainGroup">
        { this.state.totalContainer.map(e => { return e; }) }
        this.state.lineContainer.length!==0?{ this.state.lineContainer.map(e => { return e; }) }: null;
        
        <Template isShow={this.state.isShow}  ShowTemplate={this.updateContainer} x={this.state.x} y={this.state.y} />
      </g>
    )
  }
}
