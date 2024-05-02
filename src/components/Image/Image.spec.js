import React from 'react';

import { create } from '../../../test-utils';
import { image } from '../../__fixtures__';

import Image from './Image';

describe('Image', () => {
  it('should render a responsive image', () => {
    const actual = create(<Image {...image} />);
    expect(actual).toMatchSnapshot();
  });
});
