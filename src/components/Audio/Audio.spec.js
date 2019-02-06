import React from 'react';

import Audio from './Audio';

describe.skip('Audio', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Audio />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should have tests');
  });
  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Audio />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
