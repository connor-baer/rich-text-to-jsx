import { isArray, isObject } from './type-checks';

export default function isEmpty(value: unknown): boolean {
  if (!value) {
    return true;
  }

  if (isArray(value)) {
    return value.length <= 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}
