import React from 'react';
import { create } from 'react-test-renderer';

import { richText } from '../__fixtures__';

import RichText from './RichText';

describe('RichText', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<RichText richText={richText} />);
      expect(actual).toMatchSnapshot();
    });
  });
});
