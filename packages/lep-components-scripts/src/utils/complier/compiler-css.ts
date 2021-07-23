import { Console } from "..";
import { existsSync, readFileSync } from "fs-extra";
import postcss from "postcss";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import postcssPresetEnv from "postcss-preset-env";

export default (data: string, isFile: boolean = false) => {
  if (isFile) {
    if (existsSync(data)) {
      data = readFileSync(data, "utf8");
    } else {
      Console(`cant not find path：${data}`, 2);
      process.exit(1);
    }
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
  try {
    const { css } = postcss(plugins).process(data);
    return css
  } catch (error) {
    Console(error, 2);
    process.exit(1);
  }
};
