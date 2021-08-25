import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import { uglify } from 'rollup-plugin-uglify';
import { MODULE_EXTENSIONS, MODULE_NAME } from '../../constant';
import { setProcessEnv } from '..';
import path from 'path';
export default async (
  entryPath = path.resolve(process.cwd(), './components/index.ts'),
  outputPath = path.resolve(process.cwd(), './dist/index.min.js')
) => {
  const pkg = require(path.resolve(process.cwd(), 'package.json')) as {
    name: string;
  };
  const absPath = path.dirname(outputPath);
  setProcessEnv(MODULE_NAME, 'es');
  const bundle = await rollup({
    input: entryPath,
    plugins: [
      nodeResolve({
        extensions: MODULE_EXTENSIONS
      }),
      commonjs(),
      json({
        exclude: ['node_module']
      }),
      url({
        exclude: ['node_module'],
        destDir: absPath,
        limit: 10000
      }),
      babel({
        exclude: ['node_module'],
        babelHelpers: 'runtime',
        skipPreflightCheck: true,
        extensions: MODULE_EXTENSIONS
      }),
      uglify()
    ],
    external: ['react']
  });
  await bundle.write({
    format: 'umd',
    file: outputPath,
    name: pkg.name,
    globals: {
      react: 'React'
    }
  });
};
