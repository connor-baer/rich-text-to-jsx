import React from 'react';

import Video from './Video';

describe.skip('Video', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Video />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should have tests');
  });
  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Video />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
