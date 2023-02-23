import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import bundleSize from 'rollup-plugin-bundle-size';
import { defineConfig } from 'rollup';

const publicConfig = {
  format: 'umd',
  name: '{{namespce}}',
  globals: {
    eventemitter3: 'eventemitter3',
    'crypto-js': 'CryptoJS',
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
        plugins: [
          terser({
            compress: {
              drop_console: true,
            },
          }),
        ],
      },
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
      }),
      commonjs({
        include: /node_modules/,
      }),
      nodeResolve({
        customResolveOptions: {
          moduleDirectories: ['node_modules'],
        },
      }),
      bundleSize(),
      // typescript(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.es.js',
      format: 'esm',
      globals: {
        eventemitter3: 'eventemitter3',
        'crypto-js': 'CryptoJS',
      },
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
      }),
      nodeResolve({
        customResolveOptions: {
          moduleDirectories: ['node_modules'],
        },
      }),
      commonjs({
        include: /node_modules/,
      }),
      bundleSize(),
      // typescript(),
    ],
  },
]);

export default config;
