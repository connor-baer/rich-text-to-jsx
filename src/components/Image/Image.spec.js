import React from 'react';
import { create } from 'react-test-renderer';

import { image } from '../../__fixtures__';
import Image from './Image';

describe('Image', () => {
  it('should render a responsive image', () => {
    const actual = create(<Image {...image} />);
    expect(actual).toMatchSnapshot();
  });
});
