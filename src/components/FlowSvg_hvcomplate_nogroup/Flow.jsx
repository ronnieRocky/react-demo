import React from 'react';
import Rect from './Shape/Rect';
import Circle from './Shape/Circle';
import Line from './Shape/Line';
import { onRectMathDirect,
        onPosition } from './utils/Math';
import { isUndefined } from './utils/Func';


export default class Flow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultlen: 50,
      r: 10,
      height: 80,
      width: 80,
      fill: 'white',
      stroke: 'blue',
      tblr: 'vertical',
    }
  }

  init(x, y, tblr) {
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const distance = 2 * (defaultlen + r);
    let tx = x;
    let ty = y;
    const con = [];
    let lastOffset;
    let lastWidth;
    let lastHeight;
    let defTblr;
    let defFill;
    let defStroke;
    let finalCon = [];
    let totWidth = 0;
    let totheight = 2 * (defaultlen + r);
    if (typeof this.props.children === 'object' && Array.isArray(this.props.children)) {
      const arr = this.props.children;
      for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
          lastOffset = isUndefined(arr[i].props.offset, 0);
          lastWidth = isUndefined(arr[i].props.width, this.state.width);
          lastHeight = isUndefined(arr[i].props.height, this.state.height);
          defTblr = isUndefined(tblr, this.state.tblr);
          defFill = isUndefined(arr[i].props.fill, this.state.fill);
          defStroke = isUndefined(arr[i].props.stroke, this.state.stroke);
          const firChild = React.cloneElement(arr[i], { x: tx, y: ty, key: i, location: i,
                                                        width: lastWidth, height: lastHeight,
                                                        fill: defFill, stroke: defStroke,
                                                        direction: defTblr });
          con.push(firChild);
          totWidth += lastWidth;
          totheight += lastHeight + lastOffset;
        }
        if (i > 0) {
          const { width, height } = arr[i].props;
          const temtblr = isUndefined(tblr, this.state.tblr);
          const position = onPosition(tx, ty, r, defaultlen, lastWidth, lastHeight, lastOffset, temtblr);
          const tempwidth = isUndefined(width, this.state.width);
          const tempheight = isUndefined(height, this.state.height);
          //
          const bp = onRectMathDirect(position.lp.x2, position.lp.y2, tempwidth, tempheight, temtblr);
          tx = bp.x;
          ty = bp.y;
          lastOffset = isUndefined(arr[i].props.offset, 0);
          lastWidth = isUndefined(arr[i].props.width, this.state.width);
          lastHeight = isUndefined(arr[i].props.height, this.state.height);
          defFill = isUndefined(arr[i].props.fill, this.state.fill);
          defStroke = isUndefined(arr[i].props.stroke, this.state.stroke);
          const othChild = React.cloneElement(arr[i], { x: tx, y: ty, key: i, location: i,
                                                        width: lastWidth, height: lastHeight,
                                                        fill: defFill, stroke: defStroke,
                                                        direction: temtblr });
          con.push(othChild);
          totWidth += lastWidth;
          totheight += lastHeight + lastOffset + distance;
        }
      }
      const lastChild = con.slice(-1);
      const newLastChild = React.cloneElement(lastChild[0], { location: 'last' });
      finalCon = con.slice(0, con.length - 1);
      finalCon.push(newLastChild);
    } else {
      const child = this.props.children;
      lastWidth = isUndefined(child.width, this.state.width);
      lastHeight = isUndefined(child.height, this.state.height);
      defTblr = isUndefined(tblr, this.state.tblr);
      defFill = isUndefined(child.fill, this.state.fill);
      defStroke = isUndefined(child.stroke, this.state.stroke);
      const singleChild = React.cloneElement(child, { x: tx, y: ty, key: 1, location: 'last',
                                                      width: lastWidth, height: lastHeight,
                                                      fill: defFill, stroke: defStroke,
                                                      direction: defTblr });
      finalCon.push(singleChild);
      totWidth += lastWidth * 2;
      totheight += lastHeight + distance;
    }
    return { children: finalCon, sw: totWidth, sh: totheight };
  }
  render() {
    const { x, y, direction } = this.props;
    const re = this.init(x, y, direction);
    return (
      <div>
        <svg width={ re.sw + 1000 } height={ re.sh } >
          {re.children}
        </svg>
      </div>
    )
  }
}
