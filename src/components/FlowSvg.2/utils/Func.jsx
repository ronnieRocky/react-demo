import React from 'react';

export function isUndefined(value, defaultValue) {
  let reValue;
  if (typeof value === 'undefined') {
    reValue = defaultValue;
  } else {
    reValue = value;
  }
  return reValue;
}

export function isArray(value) {
  let reValue = false;
  if (typeof value === 'object' && Array.isArray(value)) {
    reValue = true;
  }
  return reValue;
}

export function cloneElement(child, x, y, key, location, direction) {
  return React.cloneElement(child, {
    x, y, key, location, direction,
  });
}
