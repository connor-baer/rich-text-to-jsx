import isEmpty from './is-empty';

export default function cx(...args) {
  const truthyClassNames = Array.prototype.slice.call(args).filter(Boolean);

  if (isEmpty(truthyClassNames)) {
    return undefined;
  }

  return truthyClassNames.join(' ');
}
