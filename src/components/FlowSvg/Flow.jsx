import React, { PropTypes } from 'react';
import Rect from './Shape/Rect';
import Circle from './Shape/Circle';
import Line from './Shape/Line';
import { onRectMathDirect, onRectMathDirectVertical,
        onPosition, onShapePosition, onVerticalOtherFirst,
        onVerticalDirect, onVerticalDirectOther } from './utils/Math';
import { isUndefined, isArray, cloneElement, exChange } from './utils/Func';
import Group from './Group';


export default class Flow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultlen: 50,
      r: 10,
      height: 40,
      width: 40,
      fill: 'white',
      stroke: 'gray',
      left: 'left',
      last: 'last',
    }
    this.onFlow = this.onFlow.bind(this);
  }

  getChildContext() {
    return { flow: (w, h) => this.onFlow(w, h) };
  }

  onFlow(w, h) {
    console.log("----------------------onFlow");
    console.log(w);
    console.log(h);
    this.setState({
      width: w,
      height: h,
    });
  }
  onHorizontalLine(connection) {
    const incon = connection.in;
    const outcon = connection.out;
    const leftRule = connection.rule.left;
    const rightRule = connection.rule.right;
    const link = (con, rule) => {
      return con.map((e, index) => {
        return <Line x1={e.x}
          y1={e.y}
          x2={rule.x}
          y2={rule.y}
          fill={this.state.fill}
          stroke={this.state.stroke}
        />
      });
    }
    return [...link(incon, leftRule), ...link(outcon, rightRule)];
  }

  onMathOutDirect(ox, oy, x) {
    const defaultlen = this.state.defaultlen;
    const tx = x + ox + defaultlen * 6;
    const ty = oy;
    return { x: tx, y: ty };
  }

  onMathRuleDirect(child, x, y, defaultlen, maxwidth) {
    const width = isUndefined(child.props.width, this.state.width);
    const height = isUndefined(child.props.height, this.state.height);
    const tx = x + defaultlen * 7 + maxwidth;
    const ty = y / 2 - height / 2;
    return { x: tx, y: ty, height: ty + height };
  }

  onMathRuleDirectSingle(child, x, y, defaultlen, maxwidth) {
    const width = isUndefined(child.props.width, this.state.width);
    const height = isUndefined(child.props.height, this.state.height);
    const tx = x + defaultlen * 7 + maxwidth;
    const ty = y;
    return { x: tx, y: ty, height: ty + height };
  }

  onHorizontalDirect(child, x, y) {
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const offset = isUndefined(child.props.offset, 0);
    const width = isUndefined(child.props.width, this.state.width);
    const height = isUndefined(child.props.height, this.state.height);
    const ty = y + height + offset + 2 * defaultlen + 2 * r;
    return { x, y: ty, width };
  }

  onInRuleOutDirect(child, x, y, direction) {
    const width = isUndefined(child.props.width, this.state.width);
    const height = isUndefined(child.props.height, this.state.height);
    const direct = onShapePosition(x, y, width, height, direction);
    console.log("onInRuleOutDirect");
    console.log(child.props);
    console.log(width);
    console.log(height);
    return { x: direct.x, y: direct.y };
  }
/////////////////////////////////////

  onVerticalFirst(children, x, y, key, local, direction) {
    const gpChild = cloneElement(children, x, y, key, local, direction);
    const subChildren = children.props.children;
    const direct = this.nodeChildDirect(subChildren, x, y, direction,
                                          onVerticalDirect,
                                          onVerticalDirectOther);
    return { x: direct.x, y: direct.y, gpChild, width: direct.width };
  }

  nodeChildDirect(node, x, y, direction, func, funcother) {
    let direct;
    let temp = exChange(x, y);
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const width = this.state.width;
    const height = this.state.height;
    let tempwidth;
    if (isArray(node)) {
      for (let s = 0; s < node.length; s++) {
        if (s === 0) {
          direct = func(node[s], temp.x, temp.y, direction, r, defaultlen, width, height);
          temp = exChange(direct.x, direct.y);
          tempwidth = direct.width;
        } else {
          direct = funcother(node[s], temp.x, temp.y, direction, r, defaultlen, width, height);
          temp = exChange(direct.x, direct.y);
          const widthOther = direct.width;
          tempwidth = tempwidth > widthOther ? tempwidth : widthOther;
        }
      }
    } else {
      direct = func(node, temp.x, temp.y, direction, r, defaultlen, width, height);
      temp = exChange(direct.x, direct.y);
      tempwidth = direct.width;
    }
    return { x: temp.x, y: temp.y, width: tempwidth };
  }

  nodeChildDirectOther(child, x, y, direction, i, len, func, funcOther) {
    let gpChild;
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const width = this.state.width;
    const height = this.state.height;
    const last = this.state.last;
    let tempwidth;
    let temp = exChange(x, y);
    const subChildren = child.props.children;
    if (isArray(subChildren)) {
      for (let s = 0; s < subChildren.length; s++) {
        if (s === 0) {
          const res = func(child, subChildren[s], temp.x, temp.y, i,
                           direction, len, r, defaultlen, width, height, last);
          temp = exChange(res.x, res.y);
          gpChild = res.gpChild;
          tempwidth = res.width;
        } else {
          const res = funcOther(subChildren[s], temp.x, temp.y,
                               direction, r, defaultlen, width, height);
          temp = exChange(res.x, res.y);
          const widthOther = res.width;
          tempwidth = tempwidth > widthOther ? tempwidth : widthOther;
        }
      }
    } else {
      const res = func(child, subChildren, temp.x, temp.y, i,
                       direction, len, r, defaultlen, width, height, last);
      temp = exChange(res.x, res.y);
      gpChild = res.gpChild;
      const widthOther = res.width;
      tempwidth = tempwidth > widthOther ? tempwidth : widthOther;
    }
    return { x: temp.x, y: temp.y, gpChild, width: tempwidth };
  }

  init(children, x, y, direction) {
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const groupArr = [];
    let lineTot;
    let gpChild;
    let temp = exChange(x, y);
    let totwidth;
    let totheight;
    let maxwidth = 0;
    let maxheight = 0;
    if (direction === 'vertical') {
      if (isArray(children)) {
        const child = children;
        const len = child.length - 1;
        for (let i = 0; i < child.length; i++) {
          if (i === 0) {
            const res = this.onVerticalFirst(child[i], temp.x, temp.y, i, i, direction);
            temp = exChange(res.x, res.y);
            gpChild = res.gpChild;
            maxwidth = res.width;
          } else {
            const res = this.nodeChildDirectOther(child[i], temp.x, temp.y, direction,
                                 i, len, onVerticalOtherFirst,
                                 onVerticalDirectOther);
            temp = exChange(res.x, res.y);
            gpChild = res.gpChild;
            maxwidth = maxwidth > res.width ? maxwidth : res.width;
          }
          groupArr.push(gpChild);
        }
      } else {
        const res = this.onVerticalFirst(children, temp.x, temp.y, 1, this.state.last, direction);
        temp = exChange(res.x, res.y);
        groupArr.push(res.gpChild);
        maxwidth = maxwidth > res.width ? maxwidth : res.width;
      }
      totwidth = x + maxwidth;
      totheight = y + temp.y + 2 * (defaultlen + r);
    } else {
      let fronum = 0;
      let innum = 0;
      const horiLineTot = {
        in: [],
        rule: {
          left: {},
          right: {},
        },
        out: [],
      };
      if (isArray(children)) {
        console.log('horizontal');
        const child = children;
        console.log(children);
        const len = child.length - 1;
        //
        for (let i = 0; i < child.length; i++) {
          const subChildren = child[i].props.children;
          const kind = child[i].props.kind;
          if (kind === 'in') {
            innum = innum + 1;
            if (i === len) {
              gpChild = cloneElement(child[i], temp.x, temp.y, i, this.state.last, direction);
            } else {
              gpChild = cloneElement(child[i], temp.x, temp.y, i, i, direction);
            }
            if (isArray(subChildren)) {
              fronum = subChildren.length;
              for (let s = 0; s < subChildren.length; s++) {
                const inres = this.onInRuleOutDirect(subChildren[s], temp.x, temp.y, direction);
                horiLineTot.in.push(inres);
                const res = this.onHorizontalDirect(subChildren[s], temp.x, temp.y);
                temp = exChange(res.x, res.y);
                maxwidth = maxwidth > res.width ? maxwidth : res.width;
              }
            } else {
              fronum = 1;
              const inres = this.onInRuleOutDirect(subChildren, temp.x, temp.y, direction);
              horiLineTot.in.push(inres);
              const res = this.onHorizontalDirect(subChildren, temp.x, temp.y);
              temp = exChange(res.x, res.y);
              maxwidth = maxwidth > res.width ? maxwidth : res.width;
            }
            maxheight = x + temp.y;
          }
          if (kind === 'rule') {
            let ruleMaxHight = this.state.height;
            if ((fronum === 0 && innum === 1) || (fronum === 1 && innum === 1)) {
              const ru = this.onMathRuleDirectSingle(subChildren, x, y, defaultlen, maxwidth);
              temp = exChange(ru.x, ru.y);
              ruleMaxHight = ru.height;
            } else {
              const ru = this.onMathRuleDirect(subChildren, temp.x, temp.y, defaultlen, maxwidth);
              temp = exChange(ru.x, ru.y);
              ruleMaxHight = ru.height;
            }
            const leftrule = this.onInRuleOutDirect(subChildren, temp.x, temp.y, this.state.left);
            const rightrule = this.onInRuleOutDirect(subChildren, temp.x, temp.y, direction);
            horiLineTot.rule.left = leftrule;
            horiLineTot.rule.right = rightrule;
            if (i === len) {
              gpChild = cloneElement(child[i], temp.x, temp.y, i, this.state.last, direction);
            } else {
              gpChild = cloneElement(child[i], temp.x, temp.y, i, i, direction);
            }
            maxheight = maxheight > ruleMaxHight ? maxheight : ruleMaxHight;
          }
          if (kind === 'out') {
            const res = this.onMathOutDirect(x, y, temp.x);
            temp = exChange(res.x, res.y);
            if (i === len) {
              gpChild = cloneElement(child[i], temp.x, temp.y, i, this.state.last, direction);
            } else {
              gpChild = cloneElement(child[i], temp.x, temp.y, i, i, direction);
            }
            if (isArray(subChildren)) {
              for (let s = 0; s < subChildren.length; s++) {
                const outres = this.onInRuleOutDirect(subChildren[s], temp.x, temp.y, this.state.left);
                horiLineTot.out.push(outres);
                const bp = this.onHorizontalDirect(subChildren[s], temp.x, temp.y);
                temp = exChange(bp.x, bp.y);
                maxwidth = maxwidth > bp.width ? maxwidth : bp.width;
              }
            } else {
              const outres = this.onInRuleOutDirect(subChildren, temp.x, temp.y, this.state.left);
              horiLineTot.out.push(outres);
              const bp = this.onHorizontalDirect(subChildren, temp.x, temp.y);
              temp = exChange(bp.x, bp.y);
              maxwidth = maxwidth > bp.width ? maxwidth : bp.width;
            }
            maxheight = maxheight > temp.y ? maxheight : temp.y;
          }
          groupArr.push(gpChild);
        }
        lineTot = this.onHorizontalLine(horiLineTot);
      } else {
        groupArr.push(cloneElement(children, temp.x, temp.y, 1, this.state.last, direction));
      }
      totwidth = x + temp.x + maxwidth;
      totheight = maxheight;
    }
    return { children: groupArr, line: lineTot, width: totwidth, height: totheight };
  }

  render() {
    const { x, y, direction, children } = this.props;
    const re = this.init(children, x, y, direction);
    return (
      <div>
        <svg width={ re.width } height={ re.height } onFlow={this.onFlow}>
          {re.children}
          {re.line}
        </svg>
      </div>
    )
  }
}

Flow.childContextTypes = {
  flow: React.PropTypes.func,
};
