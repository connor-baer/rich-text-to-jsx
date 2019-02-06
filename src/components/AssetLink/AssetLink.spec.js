import React from 'react';

import AssetLink from './AssetLink';

describe.skip('AssetLink', () => {
  // !TODO: write your tests.
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<AssetLink />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should have tests');
  });
  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<AssetLink />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
