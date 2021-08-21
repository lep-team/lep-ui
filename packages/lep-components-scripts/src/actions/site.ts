import { runCli } from '@lep-team/lep-doc';

const hjsPluginPath = require('@lep-team/lep-doc/plugins/hightlight/index.js');
const transformReactComponent = require('@lep-team/lep-doc/plugins/transformComponent/index.js');

type Options = {
  entry: string;
  output: string;
};

export default (order: string, option: Options) => {
  const { entry, output } = option;
  runCli(order, {
    mdEntry: entry,
    output,
    configFiles: [transformReactComponent, hjsPluginPath]
  });
};
