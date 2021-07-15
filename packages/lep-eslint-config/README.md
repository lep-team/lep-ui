# 公共eslint规则

## 规则说明
ts官方已摒弃tslint，拥抱eslint了，所以这里我采用eslint来做ts代码校验

eslint采用standard规范，rule下开启了一些规范被禁用的ts规则（认为禁掉并不方便的规则），后续又需要再添加的规则再加入。

## 本地使用此eslint配置

必须配置parserOptions这一项，引入你项目的tsconfig.json

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  extends: ['../lep-eslint-config']
}

```
