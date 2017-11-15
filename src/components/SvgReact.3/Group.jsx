
import React from 'react';
import Rect from './Shape/Rect';
import Line from './Shape/Line';
import Path from './Shape/Path';
import { getTempcom, onDirect, onLineMath, onMiddleMath,
         onDirectMath, onTBLR, onPathTBLR, draggingAndGetLineContainer,
         onRectMathDirect, onPosition } from './utils/Math';
import { rendomId, moduleFactory } from './utils/Func';
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
    const { id, x, y, r, defaultlen, width, height, offset, shape } = this.props;
    const position = onPosition(x, y, r, defaultlen, width, height, offset);
    return (
          <g className="ModuleGroup">
            <Branch id={id} position={position} shape={shape}
              onAdd ={this.onAdd}
            />;
          </g>
    )
  }
}
