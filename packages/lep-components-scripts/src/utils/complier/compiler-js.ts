import { transformFileSync } from '@babel/core';
import { Console, existsPath } from '..';

export default (path: string) => {
  try {
    existsPath(path);
    const result = transformFileSync(path);
    return result?.code;
  } catch (error) {
    Console(error, 2);
    process.exit(1);
  }
};
