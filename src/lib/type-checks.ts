export function isArray(value?: unknown): value is [] {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Array
  );
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return value === Object(value) && !isArray(value) && !isFunction(value);
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value?: unknown): value is Function {
  return typeof value === 'function';
}
