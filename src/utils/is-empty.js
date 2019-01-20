export default function isEmpty(obj) {
  // because Object.keys(new Date()).length === 0;
  // we have to do an additional check.
  const isObject = obj.constructor === Object;
  const hasNoKeys = Object.keys(obj).length === 0;

  return isObject && hasNoKeys;
}
