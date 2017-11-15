import { isUndefined, cloneElement } from './Func';
export function onTBLR(x, y, wh, height) {
  const tx = x + wh / 2;
  const ty = y;
  const top = { x: tx, y: ty };
  const bx = x + wh / 2;
  const by = y + height;
  const buttom = { x: bx, y: by };

  const lx = x;
  const ly = y + height / 2;
  const left = { x: lx, y: ly };

  const rx = x + wh;
  const ry = y + height / 2;
  const right = { x: rx, y: ry };
  return { top, buttom, left, right };
}

export function onRectMathDirectHorizontal(x, y, height) {
  const ox = x;
  const oy = y - height / 2;
  return { x: ox, y: oy };
}

export function onRectMathDirectVertical(x, y, width) {
  const ox = x - width / 2;
  const oy = y;
  return { x: ox, y: oy };
}

export function onDirectMath(tblr, direct) {
  let rltb = '';
  switch (direct) {
    case 'top':
      rltb = tblr.top;
      break;
    case 'buttom':
    case 'vertical':
      rltb = tblr.buttom;
      break;
    case 'left':
      rltb = tblr.left;
      break;
    case 'right':
    case 'horizontal':
      rltb = tblr.right;
      break;
    default :
      rltb = tblr.buttom;
      break;
  }
  return rltb;
}

export function onShapePosition(x, y, width, height, tblr) {
  const Tblr = onTBLR(x, y, width, height);
  const direct = onDirectMath(Tblr, tblr);
  return { ox: x, oy: y, x: direct.x, y: direct.y };
}

export function onVarLinePositionHorizontal(x, y, defaultlen, offset) {
  const lx1 = x;
  const ly1 = y;
  const lx2 = x + defaultlen + offset;
  const ly2 = y;
  return { x1: lx1, y1: ly1, x2: lx2, y2: ly2 };
}

export function onVarLinePositionVertical(x, y, defaultlen, offset) {
  const lx1 = x;
  const ly1 = y;
  const lx2 = x;
  const ly2 = y + defaultlen + offset;
  return { x1: lx1, y1: ly1, x2: lx2, y2: ly2 };
}

export function onLinePositionHorizontal(x, y, defaultlen) {
  const lx1 = x;
  const ly1 = y;
  const lx2 = x + defaultlen;
  const ly2 = y;
  return { x1: lx1, y1: ly1, x2: lx2, y2: ly2 };
}
export function onLinePositionVertical(x, y, defaultlen) {
  const lx1 = x;
  const ly1 = y;
  const lx2 = x;
  const ly2 = y + defaultlen;
  return { x1: lx1, y1: ly1, x2: lx2, y2: ly2 };
}
export function onPlusPositionHorizontal(x, y, r) {
  const tcx = x + r;
  const tcy = y;
  const retx = x + 2 * r;
  const rety = y;
  return { cx: tcx, cy: tcy, x: retx, y: rety };
}
export function onPlusPositionVertical(x, y, r) {
  const tcx = x;
  const tcy = y + r;
  const retx = x;
  const rety = y + 2 * r;
  return { cx: tcx, cy: tcy, x: retx, y: rety };
}

export function onPosHorizontalNoCircle(x, y, r, defaultlen, width, height, offset, tblr) {
  const sp = onShapePosition(x, y, width, height, tblr);
  const vlp = onVarLinePositionHorizontal(sp.x, sp.y, defaultlen, offset);
  // const plusp = onPlusPositionHorizontal(vlp.x2, vlp.y2, r);
  const lp = onLinePositionHorizontal(vlp.x2, vlp.y2, defaultlen);
  return { sp, vlp, lp };
}

export function onPosHorizontal(x, y, r, defaultlen, width, height, offset, tblr) {
  const sp = onShapePosition(x, y, width, height, tblr);
  const vlp = onVarLinePositionHorizontal(sp.x, sp.y, defaultlen, offset);
  const plusp = onPlusPositionHorizontal(vlp.x2, vlp.y2, r);
  const lp = onLinePositionHorizontal(plusp.x, plusp.y, defaultlen);
  return { sp, vlp, plusp, lp };
}

export function onPositionVertical(x, y, r, defaultlen, width, height, offset, tblr) {
  const sp = onShapePosition(x, y, width, height, tblr);
  const vlp = onVarLinePositionVertical(sp.x, sp.y, defaultlen, offset);
  const plusp = onPlusPositionVertical(vlp.x2, vlp.y2, r);
  const lp = onLinePositionVertical(plusp.x, plusp.y, defaultlen);
  return { sp, vlp, plusp, lp };
}

export function onRectMathDirect(x, y, width, height, tblr) {
  let direct;
  if (tblr === 'horizontal') {
    direct = onRectMathDirectHorizontal(x, y, height);
  } else if (tblr === 'vertical') {
    direct = onRectMathDirectVertical(x, y, width);
  }
  return direct;
}

export function isVertical(direction) {
  let bol = true;
  if (direction === 'horizontal') bol = false;
  return bol;
}

export function onPosition(x, y, r, defaultlen, width, height, offset, tblr) {
  let position;
  if (tblr === 'vertical') {
    position = onPositionVertical(x, y, r, defaultlen, width, height, offset, tblr);
  } else {
    position = onPosHorizontal(x, y, r, defaultlen, width, height, offset, tblr);
  }
  return position;
}

export function onVerticalDirect(child, x, y, tblr, r, defaultlen, rwidth, rheight) {
  const offset = isUndefined(child.props.offset, 0);
  const width = isUndefined(child.props.width, rwidth);
  const height = isUndefined(child.props.height, rheight);
  const position = onPosition(x, y, r, defaultlen, width, height, offset, tblr);
  const bp = onRectMathDirectVertical(x, y, width);
  return { rx: bp.x, ry: bp.y, x: position.lp.x2, y: position.lp.y2, width };
}

export function onVerticalDirectOther(child, x, y, tblr, r, defaultlen, rwidth, rheight) {
  const offset = isUndefined(child.props.offset, 0);
  const width = isUndefined(child.props.width, rwidth);
  const height = isUndefined(child.props.height, rheight);
  const bp = onRectMathDirectVertical(x, y, width);
  const position = onPosition(bp.x, bp.y, r, defaultlen, width, height, offset, tblr);
  return { rx: bp.x, ry: bp.y, x: position.lp.x2, y: position.lp.y2, width };
}

export function onVerticalOtherFirst(child, subchild, x, y, i, direction,
                                     len, r, defaultlen, width, height, last) {
  const bp = onVerticalDirectOther(subchild, x, y, direction, r, defaultlen, width, height);
  let gpChild = cloneElement(child, bp.rx, bp.ry, i, i, direction);
  if (i === len) {
    gpChild = cloneElement(child, bp.rx, bp.ry, i, last, direction);
  }
  return { x: bp.x, y: bp.y, gpChild, width: bp.width };
}

