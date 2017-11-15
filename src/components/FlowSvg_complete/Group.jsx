import React from 'react';
import Rect from './Shape/Rect';
import Circle from './Shape/Circle';
import Line from './Shape/Line';
import { onRectMathDirect, onRectMathDirectVertical,
        onPosition } from './utils/Math';
import { isUndefined, isArray, cloneElement } from './utils/Func';


export default class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultlen: 50,
      r: 10,
      height: 40,
      width: 40,
      fill: 'white',
      stroke: 'blue',
      tblr: 'vertical',
    }
  }

  onCommon(child) {
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const offset = isUndefined(child.props.offset, 0);
    const width = isUndefined(child.props.width, this.state.width);
    const height = isUndefined(child.props.height, this.state.height);
    const fill = isUndefined(child.props.fill, this.state.fill);
    const stroke = isUndefined(child.props.stroke, this.state.stroke);
    return { r, defaultlen, offset, width, height, fill, stroke };
  }

  onHorizontalDirect(child, i, tx, ty, tblr, locat, direction) {
    const init = this.onCommon(child);
    const node = cloneElement(child, tx, ty, i, locat,
                              direction, init.width, init.height, init.fill, init.stroke);
    const position = onPosition(tx, ty, init.r, init.defaultlen,
                                init.width, init.height, init.offset, tblr);
    const bp = onRectMathDirect(position.lp.x2, position.lp.y2, init.width, init.height, tblr);
    return { x: bp.x, y: bp.y, elment: node };
  }

  onVerticalDirect(child, i, tx, ty, tblr, locat, direction) {
    const init = this.onCommon(child);
    const node = cloneElement(child, tx, ty, i, locat,
                              direction, init.width, init.height, init.fill, init.stroke);
    const position = onPosition(tx, ty, init.r, init.defaultlen,
                                init.width, init.height, init.offset, tblr);
    return { x: position.lp.x2, y: position.lp.y2, elment: node };
  }

  onVerticalDirectOther(child, i, tx, ty, tblr, locat, direction) {
    const init = this.onCommon(child);
    const bp = onRectMathDirectVertical(tx, ty, init.width);
    const node = cloneElement(child, bp.x, bp.y, i, locat,
                              direction, init.width, init.height, init.fill, init.stroke);
    const position = onPosition(bp.x, bp.y, init.r, init.defaultlen,
                                init.width, init.height, init.offset, tblr);
    return { x: position.lp.x2, y: position.lp.y2, elment: node };
  }

  init(x, y, direction, locat) {
    let tx = x;
    let ty = y;
    const tblr = this.state.tblr;
    const finalCon = [];
    if (isArray(this.props.children)) {
      const child = this.props.children;
      const len = child.length - 1;
      for (let i = 0; i < child.length; i++) {
        let temlocat;
        let res;
        (i === len) ? temlocat = locat : temlocat = i;
        if (direction === 'vertical') {
          if (i === 0) {
            res = this.onVerticalDirect(child[i], i, tx, ty, tblr, temlocat, direction);
            tx = res.x;
            ty = res.y;
          } else {
            res = this.onVerticalDirectOther(child[i], i, tx, ty, tblr, temlocat, direction);
            tx = res.x;
            ty = res.y;
          }
          finalCon.push(res.elment);
        } else {
          res = this.onHorizontalDirect(child[i], i, tx, ty, tblr, temlocat, direction);
          tx = res.x;
          ty = res.y;
          finalCon.push(res.elment);
        }
      }
    } else {
      const child = this.props.children;
      const res = this.onVerticalDirect(child, 1, tx, ty, tblr, locat, direction);
      finalCon.push(res.elment);
    }
    return { children: finalCon };
  }
  render() {
    const { x, y, direction, location } = this.props;
    const re = this.init(x, y, direction, location);
    return (
        <g className="visual-group">
          {re.children}
        </g>
    )
  }
}
