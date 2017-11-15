'use strict';

exports.__esModule = true;
exports.onTBLR = onTBLR;
exports.onRectMathDirect = onRectMathDirect;
exports.onDirectMath = onDirectMath;
exports.onShapePosition = onShapePosition;
exports.onVarLinePosition = onVarLinePosition;
exports.onLinePosition = onLinePosition;
exports.onPlusPosition = onPlusPosition;
exports.onPosition = onPosition;
function onTBLR(x, y, wh, height) {
  var tx = x + wh / 2;
  var ty = y;
  var top = { x: tx, y: ty };
  var bx = x + wh / 2;
  var by = y + height;
  var buttom = { x: bx, y: by };

  var lx = x;
  var ly = y + height / 2;
  var left = { x: lx, y: ly };

  var rx = x + wh;
  var ry = y + height / 2;
  var right = { x: rx, y: ry };
  return { top: top, buttom: buttom, left: left, right: right };
}

function onRectMathDirect(x, y, width) {
  var ox = x - width / 2;
  var oy = y;
  return { x: ox, y: oy };
}
function onDirectMath(tblr, direct) {
  var rltb = '';
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
    default:
      rltb = tblr.buttom;
      break;
  }
  return rltb;
}

function onShapePosition(x, y, width, height) {
  var Tblr = onTBLR(x, y, width, height);
  var direct = onDirectMath(Tblr, 'buttom');
  return { ox: x, oy: y, x: direct.x, y: direct.y };
}

function onVarLinePosition(x, y, defaultlen, offset) {
  var lx1 = x;
  var ly1 = y;
  var lx2 = x;
  var ly2 = y + defaultlen + offset;
  return { x1: lx1, y1: ly1, x2: lx2, y2: ly2 };
}

function onLinePosition(x, y, defaultlen) {
  var lx1 = x;
  var ly1 = y;
  var lx2 = x;
  var ly2 = y + defaultlen;
  return { x1: lx1, y1: ly1, x2: lx2, y2: ly2 };
}
function onPlusPosition(x, y, r) {
  var tcx = x;
  var tcy = y + r;
  var retx = x;
  var rety = y + 2 * r;
  return { cx: tcx, cy: tcy, x: retx, y: rety };
}

function onPosition(x, y, r, defaultlen, width, height, offset) {
  var sp = onShapePosition(x, y, width, height);
  var vlp = onVarLinePosition(sp.x, sp.y, defaultlen, offset);
  var plusp = onPlusPosition(vlp.x2, vlp.y2, r);
  var lp = onLinePosition(plusp.x, plusp.y, defaultlen);
  return { sp: sp, vlp: vlp, plusp: plusp, lp: lp };
}