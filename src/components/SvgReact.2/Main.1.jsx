
import React from 'react';
import Rect from './Shape/Rect';
import Module from './Module';
import Drag from './Drag';
import Line from './Shape/Line';
import Path from './Shape/Path';
import { getTempcom, onDirect, onLineMath, onMiddleMath,
         onDirectMath, onTBLR, onPathTBLR, draggingAndGetLineContainer,
         onRectMathDirect, onPosition, onEndPosition } from './utils/Math';import { rendomId, moduleFactory } from './utils/Func';
import Template from './Template';
import Plus from './Plus';
import ShowShape from './ShowShape';
import Branch from './Branch';
import End from './End';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isfold: true,
      moduleContainer: [],
      totContainer: [],
      position: [],
      x: 125,
      y: 30,
      defaultlen: 50,
      r: 10,
      wh: 50,
      offset: 0,
    };
    this.onFold = this.onFold.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  onFold(bol) {
    bol ?
    (
    this.setState({
      isfold: !this.state.isfold,
      offset: this.state.isfold ? 100 : 0,
    })
    )
    :null;
  }

  onAdd() {
    this.setState({
      isfold: !this.state.isfold,
      offset: this.state.isfold ? 100 : 0,
    });
  }
  componentWillMount() {
    // const position = this.onPosition(this.state.x, this.state.y);
    // const module = this.createShape(this.state.x, this.state.y);
    // const branch = <Branch position={position} shape={module} onFold={this.onFold} />;
    // const tot = [branch];
    // const endshape = this.onBackRectDirect(position.lp.x2, position.lp.y2);
    // const endmodule = this.createShape(endshape.x, endshape.y);
    // const endposition = this.onEndPosition(endshape.x, endshape.y);
    // const end = <End position={endposition} shape={endmodule} />
    // tot.push(end);
    // this.setState({
    //   totContainer: [...tot],
    // });
  }


  handleDrag(module, bol) {
    const mod = <rect id={module.id} x={module.x} y={module.y} height={module.h} width={module.w}
      fill={module.fill} stroke={module.stroke} onClick={e => this.onFold(bol)}
    />;
    return mod;
  }

  createShape(x, y, bol) {
    const module = moduleFactory('rect', x, y);
    const shape = this.handleDrag(module, bol);
    return shape;
  }

  render() {
    const shape = onRectMathDirect(this.state.x, this.state.y, this.state.wh);

    const position = onPosition(shape.x, shape.y, this.state.r, this.state.defaultlen, this.state.wh, this.state.offset);
    const module = this.createShape(shape.x, shape.y, true);
    const branch = <Branch position={position} shape={module}
      onFold={this.onFold}
      onAdd={this.onAdd}
    />;
    // const branch = this.ssonPosition(this.state.x, this.state.y, this.state.offset);
    const tot = [branch];
    // const position = branch.po;

    const secshape = onRectMathDirect(position.lp.x2, position.lp.y2, this.state.wh);
    const secmodule = this.createShape(secshape.x, secshape.y, true);
    const secposition = onPosition(secshape.x, secshape.y, this.state.r, this.state.defaultlen, this.state.wh, this.state.offset);
    const secbranch = <Branch position={secposition} shape={secmodule}
      onFold={this.onFold}
      onAdd={this.onAdd}
    />;
    // const secbranch = this.ssonPosition(position.lp.x2, position.lp.y2, this.state.offset);
    tot.push(secbranch);
console.log(secposition.lp.x2);
console.log(secposition.lp.y2);
    const endshape = onRectMathDirect(secposition.lp.x2, secposition.lp.y2, this.state.wh);
    const endmodule = this.createShape(endshape.x, endshape.y, false);
    const endposition = onEndPosition(endshape.x, endshape.y, this.state.wh, this.state.r, this.state.defaultlen);
    const end = <End position={endposition} shape={endmodule} />
    tot.push(end);
    return (
      <g className="MainGroup">
          <g className="ModuleGroup">
            { tot.map(e => { return e; }) }
          </g>
      </g>
    )
  }
}
