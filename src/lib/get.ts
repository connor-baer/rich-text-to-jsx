import { isObject } from './type-checks';

export default function get<T = unknown>(
  obj?: Record<string, unknown>,
  path?: string | string[],
  defaultValue?: T,
): T | undefined {
  if (!obj || !path) {
    return undefined;
  }
  // Get the path as an array
  const paths = typeof path !== 'string' ? path : stringToPaths(path);

  // Cache the current object
  let currentValue: unknown = obj;

  // For each item in the path, dig into the object
  for (let i = 0; i < paths.length; i += 1) {
    const currentPath = paths[i];

    if (!isObject(currentValue)) {
      return defaultValue;
    }

    const value = currentValue[currentPath];

    // If the item isn't found, return the default (or undefined)
    if (!value) {
      return defaultValue;
    }

    // Otherwise, update the current value
    currentValue = value;
  }

  return currentValue as T;
}

function stringToPaths(path: string): string[] {
  // Split to an array from dot notation
  return path.split('.').reduce((allSegments, item) => {
    // Split to an array from bracket notation
    item.split(/\[([^}]+)\]/g).forEach((key) => {
      // Push to the new array
      if (key.length > 0) {
        allSegments.push(key);
      }
    });
    return allSegments;
  }, [] as string[]);
}
