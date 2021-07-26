import { ConfigAPI } from '@babel/core';
import { MODULE_NAME } from '..//src/constant';
import { getProcessEnv } from '../src/utils';

export default (api?: ConfigAPI) => {
  if (api) {
    api.cache.never();
  }
  const moduleValue = getProcessEnv(MODULE_NAME);
  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          modules: moduleValue === 'es' ? false : 'cjs'
        }
      ]
    ],
    plugins: [
      ['@babel/plugin-transform-runtime'],
      '@babel/plugin-transform-object-assign',
      '@babel/plugin-proposal-class-properties',
      ['@babel/plugin-proposal-private-methods', { loose: false }]
    ]
  };
};
