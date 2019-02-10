import React from 'react';
import { create } from 'react-test-renderer';

import { audio } from '../../__fixtures__';
import Audio from './Audio';

describe('Audio', () => {
  it('should render an HTML5 audio player', () => {
    const actual = create(<Audio {...audio} />);
    expect(actual).toMatchSnapshot();
  });
});
