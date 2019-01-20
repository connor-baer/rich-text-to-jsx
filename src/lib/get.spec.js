import get from './get';

describe('get', () => {
  const obj = {
    foo: {
      bar: 1,
      baz: [
        {
          fizz: 'buzz'
        }
      ]
    }
  };

  it('should accept the path as an array', () => {
    const actual = get(obj, ['foo', 'bar']);
    expect(actual).toBe(1);
  });

  it('should accept the path as a string', () => {
    const actual = get(obj, 'foo.bar');
    expect(actual).toBe(1);
  });

  it('should accept the path as a string with bracket notation', () => {
    const actual = get(obj, 'foo.baz[0].fizz');
    expect(actual).toBe('buzz');
  });

  it('should return the whole object if no path is passed', () => {
    const actual = get(obj);
    expect(actual).toBe(obj);
  });

  it('should return the default value the path does not exist', () => {
    const actual = get(obj, 'fizz.buzz', 'default');
    expect(actual).toBe('default');
  });
});
