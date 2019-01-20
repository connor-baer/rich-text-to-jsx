import cx from './cx';

describe('cx', () => {
  it('should join classnames together', () => {
    const actual = cx('foo', 'bar');
    expect(actual).toBe('foo bar');
  });

  it('should filter falsy classnames', () => {
    const actual = cx('foo', null, undefined, false, 'bar');
    expect(actual).toBe('foo bar');
  });

  it('should return undefined if no arguments are passed', () => {
    const actual = cx();
    expect(actual).toBeUndefined();
  });

  it('should return undefined if no truthy arguments are passed', () => {
    const actual = cx(undefined, null);
    expect(actual).toBeUndefined();
  });
});
