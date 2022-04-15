import isEmpty from './is-empty';

export default function cx(...args: unknown[]): string | undefined {
  const truthyClassNames = Array.prototype.slice.call(args).filter(Boolean);

  if (isEmpty(truthyClassNames)) {
    return undefined;
  }

  return truthyClassNames.join(' ');
}
