import React from 'react';
import Rect from './Shape/Rect';
import Circle from './Shape/Circle';
import Line from './Shape/Line';
import { onRectMathDirect, onRectMathDirectVertical,
        onPosition, onShapePosition } from './utils/Math';
import { isUndefined, isArray } from './utils/Func';
import Group from './Group';
import NodeHori from './NodeHori';


export default class Flow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultlen: 50,
      r: 10,
      height: 80,
      width: 80,
      fill: 'white',
      stroke: 'gray',
      left: 'left',
      last: 'last',
    }
  }

  onHorizontalLine(connection) {
    const incon = connection.in;
    const outcon = connection.out;
    const leftRule = connection.rule.left;
    const rightRule = connection.rule.right;
    const link = (con, rule) => {
      return con.map((e, index) => {
        return <Line key={index} x1={e.x}
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
    const tx = x + ox + defaultlen * 5;
    const ty = oy;
    return { x: tx, y: ty };
  }

  onMathRuleDirect(child, x, y, defaultlen) {
    const width = isUndefined(child.props.width, this.state.width);
    const height = isUndefined(child.props.height, this.state.height);
    const tx = x + defaultlen * 5 + width;
    const ty = y / 2 - height / 2;
    return { x: tx, y: ty };
  }

  onMathRuleDirectSingle(child, x, y, defaultlen) {
    const width = isUndefined(child.props.width, this.state.width);
    const height = isUndefined(child.props.height, this.state.height);
    const tx = x + defaultlen * 5 + width;
    const ty = y;
    return { x: tx, y: ty };
  }

  onVerticalDirect(child, x, y, tblr) {
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const offset = isUndefined(child.props.offset, 0);
    const width = isUndefined(child.props.width, this.state.width);
    const height = isUndefined(child.props.height, this.state.height);
    const position = onPosition(x, y, r, defaultlen, width, height, offset, tblr);
    const bp = onRectMathDirectVertical(x, y, width);
    return { rx: bp.x, ry: bp.y, x: position.lp.x2, y: position.lp.y2 };
  }

  onVerticalDirectOther(child, x, y, tblr) {
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const offset = isUndefined(child.props.offset, 0);
    const width = isUndefined(child.props.width, this.state.width);
    const height = isUndefined(child.props.height, this.state.height);
    const bp = onRectMathDirectVertical(x, y, width);
    const position = onPosition(bp.x, bp.y, r, defaultlen, width, height, offset, tblr);
    return { rx: bp.x, ry: bp.y, x: position.lp.x2, y: position.lp.y2 };
  }

  onHorizontalDirect(child, x, y) {
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const offset = isUndefined(child.props.offset, 0);
    const width = isUndefined(child.props.width, this.state.width);
    const height = isUndefined(child.props.height, this.state.height);
    const ty = y + height + offset + 2 * defaultlen + 2 * r;
    return { x, y: ty };
  }

  onInRuleOutDirect(child, x, y, direction) {
    const width = isUndefined(child.props.width, this.state.width);
    const height = isUndefined(child.props.height, this.state.height);
    const direct = onShapePosition(x, y, width, height, direction);
    return { x: direct.x, y: direct.y };
  }



  init(children, x, y, direction) {
    const r = this.state.r;
    const defaultlen = this.state.defaultlen;
    const width = this.state.width;
    const height = this.state.height;
    const groupArr = [];
    let lineTot;
    let gpChild;
    let tx = x;
    let ty = y;
    let totwidth;
    let totheight;
    if (direction === 'vertical') {
      if (isArray(children)) {
        const child = children;
        const len = child.length - 1;

        for (let i = 0; i < child.length; i++) {
          const subChildren = child[i].props.children;
          if (i === 0) {
            gpChild = React.cloneElement(child[i], {
              x: tx, y: ty, key: i, location: i,
              direction,
            });
            if (isArray(subChildren)) {
              for (let s = 0; s < subChildren.length; s++) {
                if (s === 0) {
                  const bp = this.onVerticalDirect(subChildren[s], tx, ty, direction);
                  tx = bp.x;
                  ty = bp.y;
                } else {
                  const bp = this.onVerticalDirectOther(subChildren[s], tx, ty, direction);
                  tx = bp.x;
                  ty = bp.y;
                }
              }
            } else {
              const bp = this.onVerticalDirect(subChildren, tx, ty, direction);
              tx = bp.x;
              ty = bp.y;
            }
          } else {
            if (isArray(subChildren)) {
              for (let s = 0; s < subChildren.length; s++) {
                if (s === 0) {
                  const bp = this.onVerticalDirectOther(subChildren[s], tx, ty, direction);
                  tx = bp.x;
                  ty = bp.y;
                  if (i === len) {
                    gpChild = React.cloneElement(child[i], {
                      x: bp.rx, y: bp.ry, key: i, location: this.state.last,
                      direction,
                    });
                  } else {
                    gpChild = React.cloneElement(child[i], {
                      x: bp.rx, y: bp.ry, key: i, location: i,
                      direction,
                    });
                  }
                } else {
                  const bp = this.onVerticalDirectOther(subChildren[s], tx, ty, direction);
                  tx = bp.x;
                  ty = bp.y;
                }
              }
            } else {
              const bp = this.onVerticalDirectOther(subChildren, tx, ty, direction);
              tx = bp.x;
              ty = bp.y;
              if (i === len) {
                gpChild = React.cloneElement(child[i], {
                  x: bp.rx, y: bp.ry, key: i, location: this.state.last,
                  direction,
                });
              } else {
                gpChild = React.cloneElement(child[i], {
                  x: bp.rx, y: bp.ry, key: i, location: i,
                  direction,
                });
              }
            }
          }

          groupArr.push(gpChild);
        }
      } else {
        console.log('else');
        gpChild = React.cloneElement(children, {
          x: tx, y: ty, key: 1, location: this.state.last,
          direction,
        });
        groupArr.push(gpChild);
        const subChildren = children.props.children;
        if (isArray(subChildren)) {
          for (let s = 0; s < subChildren.length; s++) {
            if (s === 0) {
              const bp = this.onVerticalDirect(subChildren[s], tx, ty, direction);
              tx = bp.x;
              ty = bp.y;
            } else {
              const bp = this.onVerticalDirectOther(subChildren[s], tx, ty, direction);
              tx = bp.x;
              ty = bp.y;
            }
          }
        } else {
          const bp = this.onVerticalDirect(subChildren, tx, ty, direction);
          tx = bp.x;
          ty = bp.y;
        }
        totwidth = tx + 2 * (defaultlen + r);
        totheight = ty + r;
      }
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
        const len = child.length - 1;
        //
        for (let i = 0; i < child.length; i++) {
          const subChildren = child[i].props.children;
          const kind = child[i].props.kind;
          if (kind === 'in') {
            innum = innum + 1;
            if (i === len) {
              gpChild = React.cloneElement(child[i], {
                x: tx, y: ty, key: i, location: this.state.last,
                direction,
              });
            } else {
              gpChild = React.cloneElement(child[i], {
                x: tx, y: ty, key: i, location: i,
                direction,
              });
            }
            if (isArray(subChildren)) {
              fronum = subChildren.length;
              for (let s = 0; s < subChildren.length; s++) {
                const inres = this.onInRuleOutDirect(subChildren[s], tx, ty, direction);
                horiLineTot.in.push(inres);
                const bp = this.onHorizontalDirect(subChildren[s], tx, ty);
                tx = bp.x;
                ty = bp.y;
              }
            } else {
              fronum = 1;
              const inres = this.onInRuleOutDirect(subChildren, tx, ty, direction);
              horiLineTot.in.push(inres);
              const bp = this.onHorizontalDirect(subChildren, tx, ty);
              tx = bp.x;
              ty = bp.y;
            }
          }
          if (kind === 'rule') {
            if (fronum === 1 && innum === 1) {
              const ru = this.onMathRuleDirectSingle(subChildren, x, y, defaultlen);
              tx = ru.x;
              ty = ru.y;
            } else {
              const ru = this.onMathRuleDirect(subChildren, tx, ty, defaultlen);
              tx = ru.x;
              ty = ru.y;
            }
            const leftrule = this.onInRuleOutDirect(subChildren, tx, ty, this.state.left);
            const rightrule = this.onInRuleOutDirect(subChildren, tx, ty, direction);
            horiLineTot.rule.left = leftrule;
            horiLineTot.rule.right = rightrule;
            if (i === len) {
              gpChild = React.cloneElement(child[i], {
                x: tx, y: ty, key: i, location: this.state.last,
                direction,
              });
            } else {
              gpChild = React.cloneElement(child[i], {
                x: tx, y: ty, key: i, location: i,
                direction,
              });
            }
          }
          if (kind === 'out') {
            const ru = this.onMathOutDirect(x, y, tx);
            tx = ru.x;
            ty = ru.y;
            if (i === len) {
              gpChild = React.cloneElement(child[i], {
                x: tx, y, key: i, location: this.state.last,
                direction,
              });
            } else {
              gpChild = React.cloneElement(child[i], {
                x, y, key: i, location: i,
                direction,
              });
            }
            if (isArray(subChildren)) {
              fronum = subChildren.length;
              for (let s = 0; s < subChildren.length; s++) {
                const outres = this.onInRuleOutDirect(subChildren[s], tx, ty, this.state.left);
                horiLineTot.out.push(outres);
                const bp = this.onHorizontalDirect(subChildren[s], tx, ty);
                tx = bp.x;
                ty = bp.y;
              }
            } else {
              const outres = this.onInRuleOutDirect(subChildren, tx, ty, this.state.left);
              horiLineTot.out.push(outres);
              const bp = this.onHorizontalDirect(subChildren, tx, ty);
              tx = bp.x;
              ty = bp.y;
            }
          }
          groupArr.push(gpChild);
        }
        lineTot = this.onHorizontalLine(horiLineTot);
      } else {
        gpChild = React.cloneElement(children, {
          x: tx, y: ty, key: 1, location: this.state.last,
          direction,
        });
        groupArr.push(gpChild);
      }
    }

    return { children: groupArr, line: lineTot, width: totwidth, height: totheight };
  }

  render() {
    const { x, y, direction, children } = this.props;
    const re = this.init(children, x, y, direction);
    return (
      <div>
        <svg width={ 1000} height={ 2000 } >
          {re.children}
          {re.line}
        </svg>
      </div>
    )
  }
}

    //                 <g>
    //       <Line key={1} x1={re.width}
    //         y1={y}
    //         x2={re.width}
    //         y2={re.height}
    //         fill={this.state.fill}
    //         stroke={this.state.stroke}
    // />
    //     <Line key={2} x1={x}
    //       y1={y}
    //       x2={re.width}
    //       y2={y}
    //       fill={this.state.fill}
    //       stroke={this.state.stroke}
    //     />
    //       </g>