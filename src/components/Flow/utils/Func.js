'use strict';

exports.__esModule = true;
exports.isUndefined = isUndefined;
function isUndefined(value, defaultValue) {
  var reValue = void 0;
  if (typeof value === 'undefined') {
    reValue = defaultValue;
  } else {
    reValue = value;
  }
  return reValue;
}