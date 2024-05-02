import React from 'react';

import { create } from '../../../test-utils';

import UnknownElement from './UnknownElement';

/* eslint-disable no-console */

describe('UnknownElement', () => {
  describe('in development', () => {
    const nodeEnv = process.env.NODE_ENV;
    const { debug } = console;

    beforeAll(() => {
      console.debug = jest.fn();
      process.env.NODE_ENV = 'development';
    });

    afterAll(() => {
      console.debug = debug;
      process.env.NODE_ENV = nodeEnv;
    });

    it('should log a debug message to the console', () => {
      create(<UnknownElement />);
      expect(console.debug).toHaveBeenCalledTimes(1);
    });

    it('should render a warning', () => {
      const actual = create(<UnknownElement />);
      expect(actual).toMatchSnapshot();
    });

    it('should render a warning and the children', () => {
      const actual = create(
        <UnknownElement>
          <p>Foo</p>
        </UnknownElement>,
      );
      expect(actual).toMatchSnapshot();
    });
  });

  describe('in production', () => {
    const nodeEnv = process.env.NODE_ENV;

    beforeAll(() => {
      process.env.NODE_ENV = 'production';
    });

    afterAll(() => {
      process.env.NODE_ENV = nodeEnv;
    });

    it('should render null', () => {
      const actual = create(<UnknownElement />);
      expect(actual).toMatchSnapshot();
    });

    it('should render the children', () => {
      const actual = create(
        <UnknownElement>
          <p>Bar</p>
        </UnknownElement>,
      );
      expect(actual).toMatchSnapshot();
    });
  });
});
