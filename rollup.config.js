import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

const globals = {
  'prop-types': 'PropTypes',
  react: 'React'
};

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'Example',
      globals
    },
    {
      file: pkg.main,
      format: 'cjs',
      globals
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: ['react', 'react-dom', 'prop-types'],
  plugins: [
    peerDepsExternal(),
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/lodash/lodash.js': ['get', 'isEmpty']
      }
    }),
    filesize()
  ]
};

export default config;
