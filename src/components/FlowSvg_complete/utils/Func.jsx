import React from 'react';

export const isUndefined = (value, defaultValue) => {
  let reValue;
  if (typeof value === 'undefined') {
    reValue = defaultValue;
  } else {
    reValue = value;
  }
  return reValue;
}

export const isArray = (value) => {
  let reValue = false;
  if (typeof value === 'object' && Array.isArray(value)) {
    reValue = true;
  }
  return reValue;
}

export function cloneElement(child, x, y, key, location, direction, width, height, fill, stroke) {
  return React.cloneElement(child, {
    x, y, key, location, direction,
    width, height, fill, stroke,
  });
}

export const exChange = (x, y) => { return { x, y } };
