export default function get(obj, path, defaultValue) {
  if (!obj || !path) {
    return obj;
  }
  // Get the path as an array
  const segments = typeof path !== 'string' ? path : stringToSegments(path);

  // Cache the current object
  let current = obj;

  // For each item in the path, dig into the object
  for (let i = 0; i < segments.length; i += 1) {
    // If the item isn't found, return the default (or undefined)
    if (!current[segments[i]]) {
      return defaultValue;
    }

    // Otherwise, update the current value
    current = current[segments[i]];
  }

  return current;
}

function stringToSegments(path) {
  // Split to an array from dot notation
  return path.split('.').reduce((allSegments, item) => {
    // Split to an array from bracket notation
    item.split(/\[([^}]+)\]/g).forEach(key => {
      // Push to the new array
      if (key.length > 0) {
        allSegments.push(key);
      }
    });
    return allSegments;
  }, []);
}
