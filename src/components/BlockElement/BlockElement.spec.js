import React from 'react';
import { create } from 'react-test-renderer';

import BlockElement from './BlockElement';

/* eslint-disable no-console */

describe('BlockElement', () => {
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
      create(<BlockElement />);
      expect(console.debug).toHaveBeenCalledTimes(1);
    });

    it('should render a warning', () => {
      const actual = create(<BlockElement />);
      expect(actual).toMatchSnapshot();
    });

    it('should render a warning and the children', () => {
      const actual = create(
        <BlockElement>
          <p>Foo</p>
        </BlockElement>
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
      const actual = create(<BlockElement />);
      expect(actual).toMatchSnapshot();
    });

    it('should render the children', () => {
      const actual = create(
        <BlockElement>
          <p>Bar</p>
        </BlockElement>
      );
      expect(actual).toMatchSnapshot();
    });
  });
});
