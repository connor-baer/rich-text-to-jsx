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
});
