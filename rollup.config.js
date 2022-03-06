// rollup.config.js

import camelCase from 'camelcase';
// import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
// import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

// Uncomment commonjs and/or resolve here and in plugins if required.
// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

// Minimum node.js version for CommonJS build.
// const node = '12'; // Until EOL 2022-04-30
// const node = '14'; // Until EOL 2023-04-30
// const node = '16'; // Until EOL 2024-04-30

// Browserslist target for Browser and ES module build.
// const targets = '>0.25%, not dead, IE 11, Firefox ESR';

// External modules.
const external = []; // e.g. ['axios'];
const globals = {}; // e.g { axios: 'axios' };

// Entry file(s) for build.
const input = ['src/index.ts'];

// Human timestamp for banner.
const datetime = new Date().toISOString().substring(0, 19).replace('T', ' ');

// Banner.
const banner = `/*! ${pkg.name} v${pkg.version} ${datetime}
 *  ${pkg.homepage}
 *  Copyright ${pkg.author} ${pkg.license} license.
 */
`;

const plugins = [
  // resolve(), // so Rollup can find CommonJS modules.
  // commonjs(), // so Rollup can convert CommonJS to ES modules.
];

export default [
  // browser-friendly iife build
  {
    input,
    external,
    output: [
      {
        banner,
        name: camelCase(pkg.name, { pascalCase: true }),
        file: pkg.browser,
        format: 'iife',
        esModule: false,
        sourcemap: true,
        globals,
      },
    ],
    plugins: [
      ...plugins,

      typescript({
        compilerOptions: {
          target: 'es6',
          lib: ['es6'],
          module: 'esnext',
        },
      }),
      terser(),
    ],
  },

  // ES module (for bundlers) build.
  {
    input,
    external,
    output: [
      {
        banner,
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      ...plugins,

      typescript({
        compilerOptions: {
          module: 'esnext',
        },
      }),
    ],
  },

  // CommonJS (for Node) build.
  {
    input,
    external,
    output: [
      {
        banner,
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        esModule: false,
      },
    ],
    plugins: [
      ...plugins,

      typescript({
        compilerOptions: {
          module: 'esnext',
        },
      }),
    ],
  },
];
