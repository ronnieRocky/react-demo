
import React from 'react';
import Rect from './Shape/Rect';
import Module from './Module';
import Drag from './Drag';
import Line from './Shape/Line';
import Path from './Shape/Path';
import { getTempcom, onDirect, onLineMath, onMiddleMath,
         onDirectMath, onTBLR, onPathTBLR, draggingAndGetLineContainer,
         onRectMathDirect, onEndPosition } from './utils/Math';
import { rendomId, moduleFactory } from './utils/Func';
import Template from './Template';
import Plus from './Plus';
import ShowShape from './ShowShape';
import Branch from './Branch';
import End from './End';


export default class Group extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd(id) {
    this.props.onAdd(id);
  }

  render() {
    const { id, x, y, r, defaultlen, wh, shape } = this.props;
    const position = onEndPosition(x, y, wh, r, defaultlen);

    return (
          <g className="ModuleGroup">
            <End id={id} position={position} shape={shape}
              onAdd ={this.onAdd}
            />;
          </g>
    )
  }
}
