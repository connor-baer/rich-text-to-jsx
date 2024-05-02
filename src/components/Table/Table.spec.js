import React from 'react';

import { create } from '../../../test-utils';
import { table } from '../../__fixtures__';

import Table from './Table';

describe('Table', () => {
  it('should render a table', () => {
    const actual = create(<Table {...table} />);
    expect(actual).toMatchSnapshot();
  });
});
