import ts from '@wessberg/rollup-plugin-ts';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from '../package.json';

const name = 'ReactMeteorData';
const input = 'src/index.ts';
const tsplugin = ts({
  tsconfig: 'tsconfig.build.json',
});
const tsdplugin = ts({
  tsconfig: 'tsconfig.build.d.json',
});
const cjs = commonjs({
  exclude: 'src/**',
  sourceMap: true,
});

export default [
  {
    input,
    external: [],
    output: { file: pkg.module, format: 'es' },
    plugins: [
      cjs,
      tsdplugin,
      nodeResolve(),
    ],
  },
  {
    input,
    external: [],
    output: { file: pkg.main, format: 'umd', name },
    plugins: [
      cjs,
      tsplugin,
      nodeResolve(),
    ],
  },
  {
    input,
    output: {
      file: pkg.browser,
      format: 'umd',
      name,
      plugins: [terser()],
    },
    plugins: [
      cjs,
      tsplugin,
      nodeResolve({
        browser: true,
      }),
    ],
  },
];
