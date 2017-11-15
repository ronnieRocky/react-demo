
import React from 'react';
import Rect from './Shape/Rect';
import Module from './Module';
import Drag from './Drag';
import Line from './Shape/Line';
import Path from './Shape/Path';
import { getTempcom, onDirect, onLineMath, onMiddleMath,
         onDirectMath, onTBLR, onPathTBLR, draggingAndGetLineContainer,
         onPosition, onEndPosition } from './utils/Math';
import { rendomId, moduleFactory } from './utils/Func';
import Template from './Template';
import Plus from './Plus';
import ShowShape from './ShowShape';
import Branch from './Branch';
import End from './End';
import Last from './Last';
import Group from './Group';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isfold: true,
      position: [],
      x: 100,
      y: 30,
      defaultlen: 50,
      r: 10,
      wh: 50,
      defaultOffset: 100,
      combetweenLen: 170,
    };
    this.onFold = this.onFold.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  componentWillMount() {
    const directcon = this.createShapeCollection(this.state.x, this.state.y, 2);
    const initcon = this.handleClick(directcon[0].id, directcon, this.state.defaultOffset);
    this.setState({
      position: [...initcon],
    });
  }

  onNextDirect(x, y) {
    const nx = x;
    const ny = y + this.state.combetweenLen;
    return { x: nx, y: ny };
  }

  createShapeCollection(x, y, len) {
    let con = [];
    let tx = x;
    let ty = y;
    con.push(this.createShape(x, y, false));
    if (len > 1) {
      for (let i = 1; i < len; i++) {
        const next = this.onNextDirect(tx, ty);
        let shape = this.createShape(next.x, next.y, false);
        tx = shape.x;
        ty = shape.y;
        con.push(shape);
      }
    }

    return con;
  }

  createShape(x, y, bol) {
    const id = rendomId();
    const shape = this.handleCreate(id, x, y);
    // const temoffset = bol ? 100 : 0;
    const direct = {
      id,
      shape,
      x,
      y,
      offset: 0,
      isfold: bol,
    };
    return direct;
  }

  handleCreate(id, x, y) {
    const mod = <g onClick={e => this.onFold(e, 100)}>
                <rect id={id} x={x} y={y} height={50} width={50}
                  fill={"white"} stroke={"green"}
                /></g>;
    return mod;
  }

  onFold(e, offset) {
    console.log('onfold');
    console.log(e.target.id);
    // const bo = this.state.isfold;
    // const offset = bo ? 100 : 0;
    const tot = this.state.position;
    const newtot = this.handleClick(e.target.id, tot, offset);
    newtot.length === 0 ?
      null :
      this.setState({
        position: [...newtot],
        isfold: !this.state.isfold,
      });
  }

  handleClick(id, tcon, offset) {
    const newcon = [];
    let con1 = [];
    let con2 = [];
    let temoffset = '';
    for (let i = 0; i < tcon.length - 1; i++) {
      if (tcon[i].id === id) {
        temoffset = tcon[i].isfold ? -offset : offset;
        tcon[i].offset += temoffset;
        con1 = tcon.slice(0, i + 1);
        con2 = tcon.slice(i + 1, tcon.length);
        tcon[i].isfold = !tcon[i].isfold;
      }
    }
    con2.length !== 0 ?
      (
        con2.forEach(e => {
          e.y += temoffset;
          const newshape = this.reDrawShape(e.id, e.x, e.y);
          e.shape = newshape;
        }))
      : null;
    return newcon.concat(con1, con2);
  }

  onAdd(id) {
    this.props.onAdd();
    console.log('main');
    console.log(id);
    const con = this.state.position;
    const defaultOffset = this.state.defaultOffset;
    const newcon = this.handleAdd(id, con, defaultOffset);
    console.log(newcon);
    this.setState({
      position: [...newcon],
    });
  }

  handleAdd(id, tcon, offset) {
    const newcon = [];
    let con1 = [];
    let con3 = [];
    // let temoffset = '';
    for (let i = 0; i < tcon.length - 1; i++) {
      if (tcon[i].id === id || tcon.length > 0) {
        con1 = tcon.slice(0, i + 1);
        con3 = tcon.slice(i + 1, tcon.length);
      }else{
        con3 = tcon.slice(-1);
      }
    }

    const fcon = con3.slice(0, 1);
    let con2 = this.createShapeCollection(fcon[0].x, fcon[0].y, 1);
    con3.length !== 0 ?
      (
        con3.forEach(e => {
          e.y += this.state.combetweenLen;
          const newshape = this.reDrawShape(e.id, e.x, e.y);
          e.shape = newshape;
        }))
      : null;
    return this.handleClick(con2[0].id, newcon.concat(con1, con2, con3), offset);
  }


  reDrawShape(id, x, y) {
    const reshape = <rect id={id} x={x} y={y} height={50} width={50}
      fill={"white"} stroke={"green"} onClick={e => this.onFold(e, 100)}
    />;
    return reshape;
  }
  render() {
    const tot = this.state.position;
    // console.log('----tot----');
    const fro = tot.slice(0, tot.length - 1);
    const end = tot.slice(-1);
    return (
      <g className="MainGroup">
          <g className="ModuleGroup">

          (tot.length>0) ?
          (
            {
              fro.map(e => {
                return <Group id={e.id} x={e.x} y={e.y}
                  r={this.state.r}
                  defaultlen = {this.state.defaultlen}
                  wh = {this.state.wh}
                  shape = {e.shape}
                  offset = {e.offset}
                  onAdd={this.onAdd}
                />;
              })
            }
            {
              end.map(e => {
                return <Last id={e.id} x={e.x} y={e.y}
                  r={this.state.r}
                  defaultlen = {this.state.defaultlen}
                  wh = {this.state.wh}
                  shape = {e.shape}
                  onAdd={this.onAdd}
                />;
              })
            }
          )
          :null
          </g>
      </g>
    )
  }
}
