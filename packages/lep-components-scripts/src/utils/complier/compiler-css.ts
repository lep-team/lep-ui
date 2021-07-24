import { Console, existsPath } from "..";
import { readFileSync } from "fs-extra";
import postcss from "postcss";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import postcssPresetEnv from "postcss-preset-env";

export default async (data: string, isFile = false) => {
  try {
    if (isFile) {
      await existsPath(data);
      data = readFileSync(data, "utf8");
    }
    if (!data) {
      return "";
    }
    const plugins: any = [
      postcssFlexbugsFixes,
      postcssPresetEnv({
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
      }),
    ];
    const { css } = postcss(plugins).process(data);
    return css;
  } catch (error) {
    Console(error, 2);
    process.exit(1);
  }
};
