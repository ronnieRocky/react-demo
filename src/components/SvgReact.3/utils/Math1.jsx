import React from 'react';
import Line from '../Shape/Line';
import Path from '../Shape/Path';

export function onDirectMath(tblr, direct) {
  let rltb = '';
  switch (direct) {
    case 'top':
      rltb = tblr.top;
      break;
    case 'buttom':
      rltb = tblr.buttom;
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

export function onTBLR(x, y, wh) {
  const tx = x + wh / 2;
  const ty = y;
  const top = { x: tx, y: ty };
  const bx = x + wh / 2;
  const by = y + wh;
  const buttom = { x: bx, y: by };

  const lx = x;
  const ly = y + wh / 2;
  const left = { x: lx, y: ly };

  const rx = x + wh;
  const ry = y + wh / 2;
  const right = { x: rx, y: ry };
  return { top, buttom, left, right };
}

export function onPathTBLR(x, y, direct) {
  let pd = '';
  switch (direct) {
    case 'buttom':
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


export function onMiddleMath(sx, sy, tx, ty, direct) {
  let middle = { x: sx, y: ty };
  if (direct.sd === 'left' && direct.td === 'right' || direct.sd === 'right' && direct.td === 'left') {
    middle = { x: tx, y: ty };
  } else {
    if (direct.sd === 'left' || direct.sd === 'right') {
      middle.y = sy;
    }
    if (direct.sd === 'top' || direct.sd === 'buttom') {
      middle.x = sx;
    }
    if (direct.td === 'left' || direct.td === 'right') {
      middle.y = ty;
    }
    if (direct.td === 'top' || direct.td === 'buttom') {
      middle.x = tx;
    }
  }
  return middle;
}

function onStraightline(x1, y1, mx, my, px, py, direct) {
  const arr = [];
  const pd = onPathTBLR(px, py, direct);
  arr.push(<line x1={x1} y1={y1} x2={mx} y2={my} stroke="green" />);
  arr.push(<Path d={pd} />);
  return arr;
}

function onMultiline(x1, y1, x2, y2, mx, my, px, py, direct) {
  const arr = [];
  const pd = onPathTBLR(px, py, direct);
  arr.push(<line x1={x1} y1={y1} x2={mx} y2={my} stroke="green" />);
  arr.push(<line x1={mx} y1={my} x2={x2} y2={y2} stroke="red" />);
  arr.push(<Path d={pd} />);
  return arr;
}

export function onLineMath(sx, sy, tx, ty, direct, middle, len, bango, locale) {
  let arr = [];
  const pn = 5;
  if (len === 1) {
    if (middle.x === tx && middle.y === ty) {
      if (locale === 'start') {
        if (direct.td === 'top' || direct.td === 'left') {
          arr = [...onStraightline(sx, sy, middle.x, middle.y, middle.x - pn, middle.y - pn, direct.td)];
        } else if (direct.td === 'buttom') {
          arr = [...onStraightline(sx, sy, middle.x, middle.y, middle.x - pn, middle.y + pn, direct.td)];
        } else {
          arr = [...onStraightline(sx, sy, middle.x, middle.y, middle.x + pn, middle.y - pn, direct.td)];
        }
      } else {
        if (direct.sd === 'top' || direct.sd === 'left') {
          arr = [...onStraightline(sx, sy, middle.x, middle.y, sx - pn, sy - pn, direct.sd)];
        } else if (direct.sd === 'buttom') {
          arr = [...onStraightline(sx, sy, middle.x, middle.y, sx - pn, sy + pn, direct.sd)];
        } else {
          arr = [...onStraightline(sx, sy, middle.x, middle.y, sx + pn, sy - pn, direct.sd)];
        }
      }
    }
    else {
      if (locale === 'start') {
        if (direct.td === 'left') {
          arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx - pn, ty - pn, direct.td)];
        } else {
          arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx + pn, ty - pn, direct.td)];
        }
      } else {
        if (direct.sd === 'top') {
          arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx - pn, sy - pn, direct.sd)];
        } else {
          arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx - pn, sy + pn, direct.sd)];
        }
      }
    }
  } else {
    if (bango === 0) {
      if (direct.sd === 'top' || direct.sd === 'left') {
        arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx - pn, sy - pn, direct.sd)];
      } else if (direct.sd === 'buttom') {
        arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx - pn, sy + pn, direct.sd)];
      }
        else {
        arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx + pn, sy - pn, direct.sd)];
      }
    } else {
      if (direct.td === 'top' || direct.td === 'left') {
        arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx - pn, ty - pn, direct.td)];
      } else if (direct.td === 'buttom') {
        arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx - pn, ty + pn, direct.td)];
      }
        else {
        arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx + pn, ty - pn, direct.td)];
      }
    }
  }
  return arr;
}

export function onDirect(self, target) {
  const sx = self.x;
  const sy = self.y;
  const tx = target.x;
  const ty = target.y;

  let direct = { sd: 'buttom', td: 'top' };
  if (sx === tx) {
    sy > ty ? direct = { sd: 'top', td: 'buttom' } : direct = { sd: 'buttom', td: 'top' };
  }
  else if (sy === ty) {
    sx > tx ? direct = { sd: 'left', td: 'right' } : direct = { sd: 'right', td: 'left' };
  }
    else {
    if (sx - tx > 30) {
      if (Math.abs(sy - ty) < 35) {
        direct = { sd: 'left', td: 'right' };
      } else {
        sy > ty ? direct = { sd: 'top', td: 'right' } : direct = { sd: 'buttom', td: 'right' };
      }
    }
    else if (sx - tx < -30) {
      if (Math.abs(sy - ty) < 35) {
        direct = { sd: 'right', td: 'left' };
      } else {
        sy > ty ? direct = { sd: 'top', td: 'left' } : direct = { sd: 'buttom', td: 'left' };
      }
    }
    else {
      sy - ty > 0 ? direct = { sd: 'top', td: 'buttom' } : direct = { sd: 'buttom', td: 'top' };
    }
  }
  console.log('direct');
  console.log(direct);
  return direct;
}

export function getTempcom(sx, sy, tx, ty, direct, len, bango, locale) {
  const wh = 50;
  const sTblr = onTBLR(sx, sy, wh);
  const tTblr = onTBLR(tx, ty, wh);
  const sdirect = onDirectMath(sTblr, direct.sd);
  const tdirect = onDirectMath(tTblr, direct.td);
  const middle = onMiddleMath(sdirect.x, sdirect.y, tdirect.x, tdirect.y, direct);
  const tempcom = onLineMath(sdirect.x, sdirect.y, tdirect.x, tdirect.y, direct, middle, len, bango, locale);
  return tempcom;
}

export function draggingAndGetLineContainer(id, mx, my, moduleContainer) {
  const con = moduleContainer;
  con.forEach(mod => {
    if (mod.id === id) {
      if (mod.mx !== mx || mod.my !== my) {
        mod.mx = mx;
        mod.my = my;
      }

      const link = mod.link;
      const self = { x: mod.mx + mod.x, y: mod.my + mod.y };

      const sid = mod.id;
      const sourceConnect = mod.connect;

      for (let j = 0; j < link.length; j++) {
        const tx = link[j].mx + link[j].x;
        const ty = link[j].my + link[j].y;
        const target = { x: tx, y: ty };

        const tid = link[j].id;
        const direct = onDirect(self, target);
        const tempcon = getTempcom(self.x, self.y, target.x, target.y, direct, link.length, j, mod.locale);

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
        mod.connect = sourceConnect;
      }
    }
  });

  let tem = [];
  con.forEach(e => e.connect.map(m => {
    tem = [...tem, ...m.value];
    return tem;
  }));
  return tem;
}

export function onRectMathDirect(x, y, wh) {
  const ox = x - wh / 2;
  const oy = y;
  return { x: ox, y: oy };
}

export function onShapePosition(x, y, wh) {
  const Tblr = onTBLR(x, y, wh);
  const direct = onDirectMath(Tblr, 'buttom');
  return { ox: x, oy: y, x: direct.x, y: direct.y };
}

export function onLinePosition(x, y, defaultlen, offset) {
  const lx1 = x;
  const ly1 = y;
  const lx2 = x;
  const ly2 = y + defaultlen + (offset ? offset : 0);
  return { x1: lx1, y1: ly1, x2: lx2, y2: ly2 };
}

export function onPlusPosition(x, y, r) {
  const tcx = x;
  const tcy = y + r;
  const retx = x;
  const rety = y + 2 * r;
  return { cx: tcx, cy: tcy, x: retx, y: rety };
}

export function onPosition(x, y, r, defaultlen, wh, offset) {
  // const sp = onShapePosition(x, y, wh);
const sp = {x:x, y: y+50};
  const vlp = onLinePosition(sp.x, sp.y, defaultlen, offset);
  const plusp = onPlusPosition(vlp.x2, vlp.y2, r);
  const lp = onLinePosition(plusp.x, plusp.y, defaultlen);
  return { sp, vlp, plusp, lp };
}

export function onEndPosition(x, y, wh, r, defaultlen) {
  const sp = onShapePosition(x, y, wh);
  const eline = onLinePosition(sp.x, sp.y, defaultlen);
  const eplus = onPlusPosition(eline.x2, eline.y2, r);

  return { x1: eline.x1, y1: eline.y1,
             x2: eline.x2, y2: eline.y2,
             cx: eplus.cx, cy: eplus.cy };
}



