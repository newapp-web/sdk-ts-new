import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { defineConfig } from 'rollup';

const publicConfig = {
  format: 'umd',
  name: '{{namespace}}',
  globals: {
    eventemitter3: 'eventemitter3',
  },
};

const config = defineConfig([
  {
    input: 'src/index.js',
    output: [
      {
        file: 'lib/index.js',
        ...publicConfig,
      },
      {
        file: 'lib/index.min.js',
        ...publicConfig,
        plugins: [terser()],
      },
    ],
    plugins: [babel(), nodeResolve(), commonjs()],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.es.js',
      format: 'esm',
      globals: {
        eventemitter3: 'eventemitter3',
      },
    },
    plugins: [babel(), nodeResolve(), commonjs()],
  },
]);

export default config;
