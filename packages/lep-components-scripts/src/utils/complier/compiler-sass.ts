import { readFileSync } from 'fs-extra';
import { renderSync } from 'sass';
import { Console, existsPath } from '..';

export default (path: string) => {
  try {
    existsPath(path);
    const source = readFileSync(path, 'utf8');
    const { css } = renderSync({
      data: source
    });
    return css.toString('utf8');
  } catch (error) {
    Console(error, 2);
    process.exit(1);
  }
};
