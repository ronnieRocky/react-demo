
import React from 'react';
import Rect from './Shape/Rect';
import Module from './Module';
import Drag from './Drag';
import Line from './Shape/Line';
import Path from './Shape/Path';
import { getTempcom, onDirect, onLineMath, onMiddleMath,
         onDirectMath, onTBLR, onPathTBLR, draggingAndGetLineContainer } from './utils/Math';
import { rendomId, moduleFactory } from './utils/Func';
import Template from './Template';
import Addplate from './Addplate';

let temid;
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      totalContainer: [],
      moduleContainer: [],
      lineContainer: [],
      firstId: '',
      clickId: '',
      lastId: '',
      x: 0,
      y: 0,
    };

    this.click = this.click.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragging = this.onDragging.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updateContainer = this.updateContainer.bind(this);
    this.onMiddle = this.onMiddle.bind(this);
    this.onMultiline = this.onMultiline.bind(this);
    this.onlinecon = this.onlinecon.bind(this);
    this.doline = this.doline.bind(this);
    this.handleLineContainer = this.handleLineContainer.bind(this);
  }

  handleDrag(module) {
    const smod = <Rect id={module.id} x={module.x} y={module.y} height={module.h} width={module.w}
      fill={module.fill} stroke={module.stroke}
    />;
    // console.log(smod);
    return smod;
  }

  componentWillMount() {
    const froModule = moduleFactory('rect', 100, 30);
    const behModule = moduleFactory('rect', 100, 230);
    const offset = typeof undefined ? 0 : 100;
    const modcon = [froModule, behModule];
    const totcon = [this.handleDrag(froModule), this.handleDrag(behModule)];
    const linecon = this.handleLineContainer(modcon, offset);
    // this.onlastcon();

    this.setState({
      totalContainer: [...totcon],
      lineContainer: [...linecon],
    });
  }

  onMiddle(sx, sy, ty, offset) {
    const y = (ty - sy) / 2 + sy;
    const middle = { x: sx, y: y + offset };
    return middle;
  }

  onMultiline(front, behind, middle) {
    const fx = front.x;
    const fy = front.y;
    const bx = behind.x;
    const by = behind.y;
    const mx = middle.x;
    const my = middle.y;
    const arr = [];
    const addwh = 5;

    arr.push(<Line x1={fx} y1={fy} x2={mx} y2={my} stroke="green" />);
    arr.push(<Line x1={mx} y1={my} x2={bx} y2={by} stroke="red" />);
    arr.push(<Addplate x={mx - addwh} y={my - addwh} />);
    return arr;
  }

  onlinecon(fro, beh, direct, offset) {
    const fx = fro.x;
    const fy = fro.y;
    const bx = beh.x;
    const by = beh.y;
    const wh = 50;
    const sTblr = onTBLR(fx, fy, wh);
    const tTblr = onTBLR(bx, by, wh);
    const sdirect = onDirectMath(sTblr, direct.sd);
    const tdirect = onDirectMath(tTblr, direct.td);

    const middle = this.onMiddle(sdirect.x, sdirect.y, tdirect.y, offset);
    const linecon = this.onMultiline(sdirect, tdirect, middle);
    return linecon;
  }

  doline(froModule, behModule, offset) {
    const direct = onDirect(froModule, behModule);
    const linecon = this.onlinecon(froModule, behModule, direct, offset);
    return linecon;
  }

  handleLineContainer(totcon, offset) {
    let linecon = [];
    for (let i = 0; i < totcon.length - 1; i++) {
      const linetem = this.doline(totcon[i], totcon[i + 1], offset);
      linecon = [...linecon, ...linetem];
    }
    return linecon;
  }

  onDragging(id, mx, my) {
    const tem = draggingAndGetLineContainer(id, mx, my, this.state.moduleContainer);
    this.setState({
      lineContainer: [...tem],
    });
  }

  onDragEnd(x, y) {
    this.setState({
      x,
      y,
    });
  }

  onDrag(bol) {
    this.setState({
      isShow: bol,
    });
  }

  click(id) {
    temid === id ?
      this.setState({
        isShow: !this.state.isShow,
        clickId: id,
      }) :
      this.setState({
        isShow: true,
        clickId: id,
      });
    temid = id;
  }



  updateContainer(type) {
    const totcon = this.state.totalContainer;
    const modcon = this.state.moduleContainer;
    const lastmodule = modcon[modcon.length - 1];
    if (!this.isTemplateShow(lastmodule)) return;
    const newmodule = moduleFactory(type, lastmodule.mx, lastmodule.my + 70);
    const modconed = this.doModuleContainer(newmodule, lastmodule, modcon);
    totcon.push(this.handleDrag(newmodule));
    this.onDragging(lastmodule.id, lastmodule.mx, lastmodule.my);
    this.setState({
      totalContainer: [...totcon],
      moduleContainer: [...modconed],
      isShow: false,
      lastId: newmodule.id,
    });
  }

  doModuleContainer(newmodule, lastmodule, modcon) {
    const lmodule = lastmodule;
    const nmodule = newmodule;
    if (lmodule.locale !== 'start') {
      lmodule.locale = '';
    }
    nmodule.locale = 'last';
    modcon.push(nmodule);
    lmodule.link.push(nmodule);
    lmodule.connect.push({ key: nmodule.id, value: [] });
    nmodule.link.push(lmodule);
    nmodule.connect.push({ key: lmodule.id, value: [] });
    return modcon;
  }

  isTemplateShow(lastmodule) {
    const fid = this.state.firstId;
    const cid = this.state.clickId;
    const lid = this.state.lastId;
    return this.isTShow(fid, cid, lid, lastmodule);
  }

  isTShow(fid, cid, lid, lastmodule) {
    let bol = true;
    if (fid === cid) {
      if (lastmodule.link.length !== 0) {
        bol = false;
      }
    } else {
      if (cid !== lid) {
        bol = false;
      }
    }
    return bol;
  }

  render() {
    return (
      <g className="MainGroup">
          <g className="ModuleGroup">
            { this.state.totalContainer.map(e => { return e; }) }
          </g>
          <g className="lineGroup">
            this.state.lineContainer.length!==0?
            { this.state.lineContainer.map(e => { return e; }) }: null;
          </g>

      </g>
    )
  }
}
