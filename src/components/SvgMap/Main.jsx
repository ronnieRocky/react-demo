
import React from 'react';
import SVG from './Svg';
import Rect from './Rect';
import Shape from './Shape';
import DragandZoom from './DragandZoom';
import Line from './Line';
import Path from './Path';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      container: [],
      shapeContainer: [],
      lineContainer: [],
    };
    this.onDrag = this.onDrag.bind(this);
  }

  onDrag (id, mx, my) {
    const con = this.state.shapeContainer;
    for (let i = 0; i < con.length; i++) {
      if (con[i].id === id) {
        if (con[i].mx !== mx || con[i].my !== my) {
          con[i].mx = mx;
          con[i].my = my;
        }

        const link = con[i].link;
        const self = { x: con[i].mx + con[i].x, y: con[i].my + con[i].y };

        const sid = con[i].id;
        const sourceConnect = con[i].connect;

        for (let j = 0; j < link.length; j++) {
          const tx = link[j].mx + link[j].x;
          const ty = link[j].my + link[j].y;
          const target = { x: tx, y: ty };

          const tid = link[j].id;
          const tempcon = this.onDirect(self, target, link.length, j, con[i].locale);

          const skv = {};
          skv.key = sid;
          skv.value = tempcon;

          const tkv = {};
          tkv.key = tid;
          tkv.value = tempcon;

          const targetConnect = link[j].connect;
          targetConnect.filter(e => e.key === skv.key).forEach(ev => {
            ev.value.length = 0;
            ev.value = [...skv.value];
          });
          link[j].connect = targetConnect;

          sourceConnect.filter(e => e.key === tkv.key).forEach(ev => {
            ev.value.length = 0;
            ev.value = [...tkv.value];
          });
          con[i].connect = sourceConnect;
        }
      }

      let tem = [];
      for (let s = 0; s < con.length; s++) {
        for (let n = 0; n < con[s].connect.length; n++) {
          tem = [...tem, ...con[s].connect[n].value];
        }
      }

      this.setState({
        lineContainer: [...tem],
      });
    }
  }

  componentWillMount() {
    const ra = new Shape('ra', 'rect', 100, 30);
    const rb = new Shape('rb', 'rect', 100, 100);
    const rc = new Shape('rc', 'rect', 100, 170);
    const rd = new Shape('rd', 'rect', 100, 240);
    const con = [];
    const con2 = [];
    ra.locale = 'start';
    con2.push(ra);
    con2.push(rb);
    con2.push(rc);
    con2.push(rd);
    con.push(<DragandZoom shape={ra} onDragging={this.onDrag} />);
    ra.link.push(rb);
    ra.connect.push({ key: 'rb', value: [] });//rb.id
    con.push(<DragandZoom shape={rb} onDragging={this.onDrag} />);
    rb.link.push(ra);
    rb.connect.push({ key: 'ra', value: [] });
    rb.link.push(rc);
    rb.connect.push({ key: 'rc', value: [] });
    con.push(<DragandZoom shape={rc} onDragging={this.onDrag} />);
    rc.link.push(rb);
    rc.connect.push({ key: 'rb', value: [] });
    rc.link.push(rd);
    rc.connect.push({ key: 'rd', value: [] });
    con.push(<DragandZoom shape={rd} onDragging={this.onDrag} />);
    rd.link.push(rc);
    rd.connect.push({ key: 'rc', value: [] });

    this.setState({
      container: [...con],
      shapeContainer: [...con2],
    });
  }

  onDirect(self, target, len, bango, locale) {
    const sx = self.x;
    const sy = self.y;
    const tx = target.x;
    const ty = target.y;

    const sTblr = this.onTBLR(sx, sy, 50);
    const tTblr = this.onTBLR(tx, ty, 50);

    let direct = { sd: 'button', td: 'top' };
    if (sx === tx) {
      console.log('1');
      sy > ty ? direct = { sd: 'top', td: 'button' } : direct = { sd: 'button', td: 'top' };
    }
    else if (sy === ty) {
      console.log('2');
      sx > tx ? direct = { sd: 'left', td: 'right' } : direct = { sd: 'right', td: 'left' };
    }
    else {
      if (sx - tx > 30) {
        console.log('31');
        if (Math.abs(sy - ty) < 35) {
          console.log('311');
          direct = { sd: 'left', td: 'right' };
        } else {
          console.log('312');
          sy > ty ? direct = { sd: 'top', td: 'right' } : direct = { sd: 'button', td: 'right' };
        }
      }
      else if (sx - tx < -30) {
        console.log('32');
        if (Math.abs(sy - ty) < 35) {
          console.log('321');
          direct = { sd: 'right', td: 'left' };
        } else {
          console.log('322');
          sy > ty ? direct = { sd: 'top', td: 'left' } : direct = { sd: 'button', td: 'left' };
        }
      }
      else {
        console.log('4');
        sy - ty > 0 ? direct = { sd: 'top', td: 'button' } : direct = { sd: 'button', td: 'top' };
      }
    }

    console.log('direct');
    console.log(direct);
    const sdirect = this.onDirectMath(sTblr, direct.sd);
    const tdirect = this.onDirectMath(tTblr, direct.td);
    let tempcom = [];
    const middle = this.onMiddleMath(sdirect.x, sdirect.y, tdirect.x, tdirect.y, direct);
    tempcom = this.onLineMath(sdirect.x, sdirect.y, tdirect.x, tdirect.y, direct, middle, len, bango, locale);
    return tempcom;
  }


  onMiddleMath(sx, sy, tx, ty, direct) {
    let middle = { x: sx, y: ty };
    if (direct.sd === 'left' && direct.td === 'right' || direct.sd === 'right' && direct.td === 'left') {
      middle = { x: tx, y: ty };
    } else {
      if (direct.sd === 'left' || direct.sd === 'right') {
        middle.y = sy;
      }
      if (direct.sd === 'top' || direct.sd === 'button') {
        middle.x = sx;
      }
      if (direct.td === 'left' || direct.td === 'right') {
        middle.y = ty;
      }
      if (direct.td === 'top' || direct.td === 'button') {
        middle.x = tx;
      }
    }
    return middle;
  }

  onStraightline(x1, y1, mx, my, px, py, direct) {
    const arr = [];
    const pd = this.onPathTBLR(px, py, direct);
    arr.push(<line x1={x1} y1={y1} x2={mx} y2={my} stroke="green" />);
    arr.push(<Path d={pd} />);
    return arr;
  }

  onMultiline(x1, y1, x2, y2, mx, my, px, py, direct) {
    const arr = [];
    const pd = this.onPathTBLR(px, py, direct);
    arr.push(<line x1={x1} y1={y1} x2={mx} y2={my} stroke="green" />);
    arr.push(<line x1={mx} y1={my} x2={x2} y2={y2} stroke="red" />);
    arr.push(<Path d={pd} />);
    return arr;
  }

  onLineMath(sx, sy, tx, ty, direct, middle, len, bango, locale) {
    let arr = [];
    const pn = 5;
    if (len === 1) {
      if (middle.x === tx && middle.y === ty) {
        if (locale === 'start') {
          if (direct.td === 'top' || direct.td === 'left') {
            arr = [...this.onStraightline(sx, sy, middle.x, middle.y, middle.x - pn, middle.y - pn, direct.td)];
          } else if (direct.td === 'button') {
            arr = [...this.onStraightline(sx, sy, middle.x, middle.y, middle.x - pn, middle.y + pn, direct.td)];
          } else {
            arr = [...this.onStraightline(sx, sy, middle.x, middle.y, middle.x + pn, middle.y - pn, direct.td)];
          }
        } else {
          if (direct.sd === 'top' || direct.sd === 'left') {
            arr = [...this.onStraightline(sx, sy, middle.x, middle.y, sx - pn, sy - pn, direct.sd)];
          } else if (direct.sd === 'button') {
            arr = [...this.onStraightline(sx, sy, middle.x, middle.y, sx - pn, sy + pn, direct.sd)];
          } else {
            arr = [...this.onStraightline(sx, sy, middle.x, middle.y, sx + pn, sy - pn, direct.sd)];
          }
        }
      }
      else {
        if (locale === 'start') {
          if (direct.td === 'left') {
            arr = [...this.onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx - pn, ty - pn, direct.td)];
          } else {
            arr = [...this.onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx + pn, ty - pn, direct.td)];
          }
        } else {
          if (direct.sd === 'top') {
            arr = [...this.onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx - pn, sy - pn, direct.sd)];
          } else {
            arr = [...this.onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx - pn, sy + pn, direct.sd)];
          }
        }
      }
    } else {
      if (bango === 0) {
        if (direct.sd === 'top' || direct.sd === 'left') {
          arr = [...this.onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx - pn, sy - pn, direct.sd)];
        } else if (direct.sd === 'button') {
          arr = [...this.onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx - pn, sy + pn, direct.sd)];
        }
        else {
          arr = [...this.onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx + pn, sy - pn, direct.sd)];
        }
      } else {
        if (direct.td === 'top' || direct.td === 'left') {
          arr = [...this.onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx - pn, ty - pn, direct.td)];
        } else if (direct.td === 'button') {
          arr = [...this.onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx + pn, ty - pn, direct.td)];
        }
        else {
          arr = [...this.onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx + pn, ty - pn, direct.td)];
        }
      }
    }
    return arr;
  }

  onPathTBLR(x, y, direct) {
    let pd = '';
    switch (direct) {
      case 'button':
        pd = 'M' + x + ' ' + y + 'l5 -5 5 5z';
        break;
      case 'top':
        pd = 'M' + x + ' ' + y + 'l5 5 5-5z';
        break;
      case 'right':
        pd = 'M' + x + ' ' + y + 'l-5 5 5 5z';
        break;
      case 'left':
        pd = 'M' + x + ' ' + y + 'l5 5 -5 5z';
        break;
    }
    return pd;
  }

  onDirectMath(tblr, direct) {
    let rltb = '';
    switch (direct) {
      case 'top':
        rltb = tblr.top;
        break;
      case 'button':
        rltb = tblr.button;
        break;
      case 'left':
        rltb = tblr.left;
        break;
      case 'right':
        rltb = tblr.right;
        break;
    }
    return rltb;
  }

  onTBLR(x, y, wh) {
    const tx = x + wh / 2;
    const ty = y;
    const top = { x: tx, y: ty };

    const bx = x + wh / 2;
    const by = y + wh;
    const button = { x: bx, y: by };

    const lx = x;
    const ly = y + wh / 2;
    const left = { x: lx, y: ly };

    const rx = x + wh;
    const ry = y + wh / 2;
    const right = { x: rx, y: ry };
    return { top, button, left, right };
  }


  render() {
    return (
      <g className="MainGroup">
        { this.state.container.map(e => { return e; }) }
        this.state.lineContainer.length!==0?{ this.state.lineContainer.map(e => { return e; }) }: null;
      </g>
    )
  }
}
