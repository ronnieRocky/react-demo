export function isUndefined(value, defaultValue) {
  let reValue;
  if (typeof value === 'undefined') {
    reValue = defaultValue;
  } else {
    reValue = value;
  }
  return reValue;
}
