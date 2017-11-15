
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
  }

  componentWillMount() {
    const totcon = [];
    const modcon = [];
    const firstModule = moduleFactory('rect', 100, 30);
    firstModule.locale = 'start';
    modcon.push(firstModule);
    totcon.push(this.handleDrag(firstModule));
    this.setState({
      totalContainer: [...totcon],
      moduleContainer: [...modcon],
      firstId: firstModule.id,
    });
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

  handleDrag(module) {
    const smod = <Rect id={module.id} x={module.x} y={module.y} height={module.h} width={module.w}
                fill={module.fill} stroke={module.stroke}
              />;
    console.log(smod);
    return <Drag shape={smod}
      onDragEnd={this.onDragEnd}
      onDrag={this.onDrag}
      onDragging={this.onDragging}
      onClick={this.click}
    />;
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
          <g className="Template">
            <Template
              isShow={this.state.isShow}
              showTemplate={this.updateContainer}
              x={this.state.x}
              y={this.state.y}
    />
          </g>
      </g>
    )
  }
}
