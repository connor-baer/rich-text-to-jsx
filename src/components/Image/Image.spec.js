import React from 'react';

import Image from './Image';

describe.skip('Image', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Image />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should have tests');
  });
  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Image />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
