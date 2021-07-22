import { existsSync, readFileSync } from 'fs-extra';
import { renderSync } from 'sass'
import { Console } from '..';


export default (path: string) => {
  if (existsSync(path)) {
    const source = readFileSync(path, 'utf8')
    try {
      const { css } = renderSync({
        data: source
      });
      return css.toString('utf8')
    } catch (error) {
      Console(error, 2)
      process.exit(1)
    }
  } else {
    Console(`cant not find path: ${path}`, 2)
    process.exit(1)
  }
}   