export default function isEmpty(obj) {
  if (!obj) {
    return true;
  }

  const isArray = obj instanceof Array;
  if (isArray) {
    return obj.length <= 0;
  }

  const isObject = obj.constructor === Object;
  if (isObject) {
    return Object.keys(obj).length === 0;
  }

  return false;
}
