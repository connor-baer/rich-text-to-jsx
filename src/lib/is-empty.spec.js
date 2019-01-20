import isEmpty from './is-empty';

describe('isEmpty', () => {
  describe('array', () => {
    it('should return true if the array is empty', () => {
      const actual = isEmpty([]);
      expect(actual).toBeTruthy();
    });

    it('should return false if the array is not empty', () => {
      const actual = isEmpty(['foo', 'bar']);
      expect(actual).toBeFalsy();
    });
  });

  describe('object', () => {
    it('should return true if the object is empty', () => {
      const actual = isEmpty({});
      expect(actual).toBeTruthy();
    });

    it('should return false if the object is not empty', () => {
      const actual = isEmpty({ foo: 'bar' });
      expect(actual).toBeFalsy();
    });
  });

  describe('other', () => {
    it('should return true if the element is undefined', () => {
      const actual = isEmpty();
      expect(actual).toBeTruthy();
    });

    it('should return false if the element is not an object or array', () => {
      const actual = isEmpty(new Date());
      expect(actual).toBeFalsy();
    });
  });
});
