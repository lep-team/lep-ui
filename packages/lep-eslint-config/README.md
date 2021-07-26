# 公共eslint规则

## 规则说明
ts官方已摒弃tslint，拥抱eslint了，所以这里我采用eslint来做ts代码校验

rule下开启了一些规范被禁用的ts规则（认为禁掉并不方便的规则），后续又需要再添加的规则再加入。

## 如何使用

```shell
npm i @lep-team/eslint-config -D
```

```js
module.exports = {
  extends: ['@lep-team']
};

```
