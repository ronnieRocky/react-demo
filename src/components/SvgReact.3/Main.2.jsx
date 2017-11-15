
import React from 'react';
import Rect from './Shape/Rect';
import Circle from './Shape/Circle';
import Line from './Shape/Line';
import Path from './Shape/Path';
import { getTempcom, onDirect, onLineMath, onMiddleMath,
         onDirectMath, onTBLR, onPathTBLR, draggingAndGetLineContainer,
         onPosition, onEndPosition } from './utils/Math';
import { rendomId, moduleFactory } from './utils/Func';
import Plus from './Plus';
import ShowShape from './ShowShape';
import Branch from './Branch';
import End from './End';
import Last from './Last';
import Group from './Group';
import { OutEnhance } from './OutEnhance';

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
      fill: 'white',
      stroke: 'green',
      width: 50,
      height: 50,
    };
    this.onFold = this.onFold.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  getDirect(x, y, shape, mx, my) {
    const fill = this.state.fill;
    const stroke = this.state.stroke;
    const id = rendomId();
    const ShapeComponent = OutEnhance(mx, my)(shape);
    const direct = {
      id,
      x,
      y,
      mx,
      my,
      offset: 0,
      isfold: false,
      shape,
    };
    direct.component = <ShapeComponent id={direct.id} 
      height={50} width={50} fill={fill} stroke= {stroke} cx={direct.x} cy={direct.y} r={this.state.r}
      onClick={e => this.onFold(e, 100)} />;

    return direct;
  }

  componentWillMount() {
    // console.log("componentWillMount");
    // shapeArr  x, y
    // const { x, y, shapeArr, ...others } = this.props;
    const x = this.state.x;
    const y = this.state.y;
    const shapeArr = [Rect, Rect, Rect];
    let con = [];
    for (let i = 0; i < shapeArr.length; i++) {
      if (i === 0) {
        const firstdirect = this.getDirect(x, y, shapeArr[i], x, y);
        con.push(firstdirect);
      } else {
        const pre = con.slice(-1);
        const next = this.onNextDirect(pre[0].x, pre[0].y);
        const nextdirect = this.getDirect(next.x, next.y, shapeArr[i], x, y);
        con.push(nextdirect);
      }
    }
    // console.log("con");
    // console.log(con);
    const directCon = this.handleClick(con[0].id, con, this.state.defaultOffset);
    this.setState({
      position: [...directCon],
    });
  }

  onNextDirect(x, y) {
    const nx = x;
    const ny = y + this.state.combetweenLen;
    return { x: nx, y: ny };
  }

  onFold(e, offset) {
    console.log('onfold');
    // console.log(e);
    const tot = this.state.position;
    const newtot = this.handleClick(e.target.id, tot, offset);
    newtot.length === 0 ?
      null :
      this.setState({
        position: [...newtot],
      });
  }

  handleClick(id, tcon, offset) {
    console.log('handleClick');
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
    // console.log(con1);
    con2.length !== 0 ?
      (
        con2.forEach(e => {
          e.y += temoffset;
          const ReComponent = OutEnhance(e.mx, e.my)(e.shape);
          e.component = <ReComponent id={e.id} x={e.x} y={e.y} cx={e.x} cy={e.y} r={this.state.r}
          height={50} width={50} fill={this.state.fill} stroke= {this.state.stroke}
          onClick={e => this.onFold(e, 100)} />;
        }))
      : null;
      // console.log(con2);
      // console.log(newcon.concat(con1, con2));
    return newcon.concat(con1, con2);
  }

  onAdd(id) {
    // this.props.onAdd();
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
    for (let i = 0; i < tcon.length - 1; i++) {
      if (tcon[i].id === id || tcon.length > 0) {
        con1 = tcon.slice(0, i + 1);
        con3 = tcon.slice(i + 1, tcon.length);
      } else {
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

  render() {
    const tot = this.state.position;
    // console.log(tot);
    const fro = tot.slice(0, tot.length - 1);
    const end = tot.slice(-1);
    return (
      <g className="MainGroup">
          (
            {
              fro.map(e => {
                return <Group id={e.id} x={e.x} y={e.y}
                  r={this.state.r} mx={e.mx} my={e.my}
                  defaultlen = {this.state.defaultlen}
                  wh = {this.state.wh}
                  shape = {e.component}
                  offset = {e.offset}
                  onAdd={this.onAdd}
                />;
              })
            }
            {
              end.map(e => {
                return <Last id={e.id} x={e.x} y={e.y}
                  r={this.state.r} mx={e.mx} my={e.my}
                  defaultlen = {this.state.defaultlen}
                  wh = {this.state.wh}
                  shape = {e.component}
                  onAdd={this.onAdd}
                />;
              })
            }
          )
          :null
      </g>
    )
  }
}
