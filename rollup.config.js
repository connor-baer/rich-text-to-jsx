import babel from 'rollup-plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

const globals = {
  'prop-types': 'PropTypes',
  'react': 'React',
};

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'richTextToJsx',
      exports: 'named',
      globals,
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      globals,
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: ['react', 'react-dom', 'prop-types'],
  plugins: [
    external(),
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs(),
    filesize(),
  ],
};

export default config;
