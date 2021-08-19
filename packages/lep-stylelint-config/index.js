'use strict';

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  plugins: ['stylelint-order'],
  ignoreFiles: ['**/*.js', '**/*.ts'],
  rules: {
    // 不要使用已被 autoprefixer支持的浏览器前缀
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'at-rule-empty-line-before': true,
    'selector-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true
  }
};
