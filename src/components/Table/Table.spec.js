import React from 'react';
import { create } from 'react-test-renderer';

import { table } from '../../__fixtures__';

import Table from './Table';

describe('Table', () => {
  it('should render a table', () => {
    const actual = create(<Table {...table} />);
    expect(actual).toMatchSnapshot();
  });
});
