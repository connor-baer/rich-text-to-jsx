import React from 'react';

import { create } from '../../../test-utils';
import { image } from '../../__fixtures__';

import AssetLink from './AssetLink';

describe('AssetLink', () => {
  it('should render an asset link', () => {
    const actual = create(<AssetLink {...image} />);
    expect(actual).toMatchSnapshot();
  });
});
