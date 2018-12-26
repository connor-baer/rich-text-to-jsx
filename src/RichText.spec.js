import React from 'react';

import RichText from './RichText';

describe.skip('RichText', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<RichText />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should have tests');
  });
  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<RichText />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
