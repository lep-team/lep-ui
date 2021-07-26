import { render } from 'less';
import { readFileSync } from 'fs-extra';
import { Console, existsPath } from '..';

export default async (path: string) => {
  try {
    existsPath(path);
    const source = readFileSync(path, 'utf8');
    const { css } = await render(source, {
      filename: path
    });
    return css;
  } catch (error) {
    Console(error, 2);
    process.exit(1);
  }
};
