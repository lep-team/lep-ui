import { runCli } from '@lep-team/lep-doc';

const hjsPluginPath = require('@lep-team/lep-doc/plugins/hightlight/index.js');
const transformReactComponent = require('@lep-team/lep-doc/plugins/transformComponent/index.js');

export default (order: string) => {
  runCli(order, {
    configFiles: [transformReactComponent, hjsPluginPath]
  });
};
