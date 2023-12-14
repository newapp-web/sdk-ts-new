import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import bundleSize from 'rollup-plugin-bundle-size';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
const globalsConfig = {
  eventemitter3: 'eventemitter3',
  lodash: 'lodash'
};
const outputFileName = 'index';
const outputDir = 'lib';
const outputPath = (key, customSuffix) => {
  if (customSuffix) {
    return `${outputDir}/${outputFileName}.${key}.${customSuffix}.js`;
  } else {
    return `${outputDir}/${outputFileName}.${key}.js`;
  }
};
const umdConfig = {
  format: 'umd',
  name: '{{namespace}}',
  globals: globalsConfig,
};

const esConfig = {
  format: 'esm',
  globals: globalsConfig,
};
const commonConfig = {
  format: 'cjs',
  globals: globalsConfig,
};

const pluginsConfig = [
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
  typescript({
    declaration: true,
    target: 'ES5',
  }),
];

const config = defineConfig([
  {
    input: 'src/index.js',
    output: [
      {
        file: outputPath('umd'),
        ...umdConfig,
      },
      {
        file: outputPath('umd', 'min'),
        ...umdConfig,
        plugins: [
          terser({
            compress: {
              drop_console: true,
            },
          }),
        ],
      },
    ],
    plugins: pluginsConfig,
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: outputPath('esm'),
        ...esConfig,
      },
      {
        file: outputPath('esm', 'min'),
        ...esConfig,
        plugins: [
          terser({
            compress: {
              drop_console: true,
            },
          }),
        ],
      },
    ],
    plugins: pluginsConfig,
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: outputPath('cjs'),
        ...commonConfig,
      },
      {
        file: outputPath('cjs', 'min'),
        ...commonConfig,
        plugins: [
          terser({
            compress: {
              drop_console: true,
            },
          }),
        ],
      },
    ],
    plugins: pluginsConfig,
  },
]);

export default config;
