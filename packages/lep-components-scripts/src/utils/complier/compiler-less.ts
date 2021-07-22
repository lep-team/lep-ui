import { render } from "less";
import { existsSync, readFileSync } from 'fs-extra';
import { Console } from "..";

export default async (path: string) => {
  if (existsSync(path)) {
    const source = readFileSync(path, 'utf8')
    try {
      const { css } = await render(source, {
        filename: path
      });
      return css
    } catch (error) {
      Console(error, 2)
      process.exit(1)
    }
  } else {
    Console(`cant not find path: ${path}`, 2)
    process.exit(1)
  }
};
