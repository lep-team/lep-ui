import { transformFileSync } from '@babel/core';
import { Console, existsPath } from '..';
import getBabelConfig from '../../config/babel.config';

export default (path: string) => {
  try {
    existsPath(path);
    const babelConfig = getBabelConfig();
    const result = transformFileSync(path, {
      ...babelConfig
    });
    return result?.code;
  } catch (error) {
    Console(error, 2);
    process.exit(1);
  }
};
