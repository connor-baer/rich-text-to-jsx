import React from 'react';
import { create } from 'react-test-renderer';

import { video } from '../../__fixtures__';
import Video from './Video';

describe('Video', () => {
  it('should render a responsive video', () => {
    const actual = create(<Video {...video} />);
    expect(actual).toMatchSnapshot();
  });
});
