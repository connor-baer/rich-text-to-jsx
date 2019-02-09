import React from 'react';
import { create } from 'react-test-renderer';

import {
  createDocument,
  headingOne,
  paragraph,
  unorderedList,
  blockquote,
  hr
} from '../../__fixtures__';

import RichText from './RichText';

describe('RichText', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const richText = createDocument([
        headingOne,
        paragraph,
        unorderedList,
        hr,
        blockquote
      ]);
      const actual = create(<RichText richText={richText} />);
      expect(actual).toMatchSnapshot();
    });
  });
});
