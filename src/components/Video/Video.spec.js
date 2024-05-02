import React from 'react';

import { create } from '../../../test-utils';
import { video } from '../../__fixtures__';

import Video from './Video';

describe('Video', () => {
  it('should render a responsive video', () => {
    const actual = create(<Video {...video} />);
    expect(actual).toMatchSnapshot();
  });
});
