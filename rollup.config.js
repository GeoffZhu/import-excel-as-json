import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: './index.es.js',
  output: {
    file: './index.js',
    format: 'umd',
    name: 'importExcelAsJson'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    nodeResolve({
      browser: true
    }),
    commonjs()
  ]
};

export default config
