import React from 'react';
import Line from '../Shape/Line';
import Path from '../Shape/Path';

export function onDirectMath(tblr, direct) {
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

export function onTBLR(x, y, wh) {
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

export function onPathTBLR(x, y, direct) {
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


export function onMiddleMath(sx, sy, tx, ty, direct) {
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
          } else if (direct.td === 'button') {
            arr = [...onStraightline(sx, sy, middle.x, middle.y, middle.x - pn, middle.y + pn, direct.td)];
          } else {
            arr = [...onStraightline(sx, sy, middle.x, middle.y, middle.x + pn, middle.y - pn, direct.td)];
          }
        } else {
          if (direct.sd === 'top' || direct.sd === 'left') {
            arr = [...onStraightline(sx, sy, middle.x, middle.y, sx - pn, sy - pn, direct.sd)];
          } else if (direct.sd === 'button') {
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
        } else if (direct.sd === 'button') {
          arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx - pn, sy + pn, direct.sd)];
        }
        else {
          arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, sx + pn, sy - pn, direct.sd)];
        }
     } else {
       if (direct.td === 'top' || direct.td === 'left') {
          arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx - pn, ty - pn, direct.td)];
        } else if (direct.td === 'button') {
          arr = [...onMultiline(sx, sy, tx, ty, middle.x, middle.y, tx + pn, ty - pn, direct.td)];
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

  let direct = { sd: 'button', td: 'top' };
  if (sx === tx) {
      // console.log('1');
      sy > ty ? direct = { sd: 'top', td: 'button' } : direct = { sd: 'button', td: 'top' };
    }
  else if (sy === ty) {
      // console.log('2');
      sx > tx ? direct = { sd: 'left', td: 'right' } : direct = { sd: 'right', td: 'left' };
    }
    else {
      if (sx - tx > 30) {
        // console.log('31');
        if (Math.abs(sy - ty) < 35) {
          // console.log('311');
          direct = { sd: 'left', td: 'right' };
        } else {
          // console.log('312');
          sy > ty ? direct = { sd: 'top', td: 'right' } : direct = { sd: 'button', td: 'right' };
        }
      }
      else if (sx - tx < -30) {
        // console.log('32');
        if (Math.abs(sy - ty) < 35) {
          // console.log('321');
          direct = { sd: 'right', td: 'left' };
        } else {
          // console.log('322');
          sy > ty ? direct = { sd: 'top', td: 'left' } : direct = { sd: 'button', td: 'left' };
        }
      }
      else {
        // console.log('4');
        sy - ty > 0 ? direct = { sd: 'top', td: 'button' } : direct = { sd: 'button', td: 'top' };
      }
    }

  console.log('direct');
  console.log(direct);
  return direct;
}

 export function getTempcom(sx,sy,tx,ty,direct, len, bango, locale){
    const sTblr = onTBLR(sx, sy, 50);
    const tTblr = onTBLR(tx, ty, 50);
    const sdirect = onDirectMath(sTblr, direct.sd);
    const tdirect = onDirectMath(tTblr, direct.td);
    let tempcom = [];
    const middle = onMiddleMath(sdirect.x, sdirect.y, tdirect.x, tdirect.y, direct);
    tempcom = onLineMath(sdirect.x, sdirect.y, tdirect.x, tdirect.y, direct, middle, len, bango, locale);
    return tempcom;
  }