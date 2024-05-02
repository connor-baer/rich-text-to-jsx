import React from 'react';
import PropTypes from 'prop-types';

import { create } from '../../../test-utils';
import {
  createDocument,
  headingOne,
  paragraph,
  unorderedList,
  blockquote,
  hr,
} from '../../__fixtures__';

import RichText from './RichText';

describe('RichText', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const richText = createDocument([
        headingOne,
        paragraph,
        unorderedList,
        hr,
        blockquote,
      ]);
      const actual = create(<RichText richText={richText} />);
      expect(actual).toMatchSnapshot();
    });

    it('should allow to override normal text', () => {
      const Text = ({ children, ...props }) => (
        <span {...props}>{children}</span>
      );
      Text.propTypes = {
        children: PropTypes.node,
      };

      const richText = createDocument([paragraph]);
      const actual = create(
        <RichText
          richText={richText}
          overrides={{
            text: {
              component: Text,
            },
          }}
        />,
      );
      expect(actual).toMatchSnapshot();
    });
  });
});
