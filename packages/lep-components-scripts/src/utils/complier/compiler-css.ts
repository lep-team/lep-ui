import { Console, existsPath } from '..';
import { readFileSync } from 'fs-extra';
import postcss from 'postcss';
import CleanCSS from 'clean-css';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssPresetEnv from 'postcss-preset-env';

export default async (data: string, isFile = false) => {
  try {
    if (isFile) {
      existsPath(data);
      data = readFileSync(data, 'utf8');
    }
    if (!data) {
      return '';
    }
    const plugins: any = [
      postcssFlexbugsFixes,
      postcssPresetEnv({
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3
      })
    ];
    const { css } = await postcss(plugins).process(data, { from: undefined });
    return new CleanCSS({}).minify(css).styles;
  } catch (error) {
    Console(error, 2);
    process.exit(1);
  }
};
