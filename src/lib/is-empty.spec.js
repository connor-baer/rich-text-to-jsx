import isEmpty from './is-empty';

describe('isEmpty', () => {
  it('should return true if the object is undefined', () => {
    const actual = isEmpty();
    expect(actual).toBeTruthy();
  });

  it('should return true if the object is empty', () => {
    const actual = isEmpty({});
    expect(actual).toBeTruthy();
  });

  it('should return true if the object is undefined', () => {
    const actual = isEmpty();
    expect(actual).toBeTruthy();
  });

  it('should return false if the object is not an object', () => {
    const actual = isEmpty(new Date());
    expect(actual).toBeFalsy();
  });

  it('should return false if the object is not empty', () => {
    const actual = isEmpty({ foo: 'bar' });
    expect(actual).toBeFalsy();
  });
});
