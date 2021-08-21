import { runCli } from '@lep-team/lep-doc';
import path from 'path';

// @ts-ignore
import hjsPluginPath from '@lep-team/lep-doc/plugins/hightlight/index.js';
// @ts-ignore
import transformReactComponent from '@lep-team/lep-doc/plugins/transformComponent/index.js';

type Options = {
  entry: string;
  output: string;
};

export default (order: string, option: Options) => {
  const { entry, output } = option;
  runCli(order, {
    mdEntry: path.resolve(process.cwd(), entry),
    output: path.resolve(process.cwd(), output),
    configFiles: [transformReactComponent, hjsPluginPath]
  });
};
