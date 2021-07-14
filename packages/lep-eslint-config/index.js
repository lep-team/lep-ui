module.exports = {
  extends: 'standard-with-typescript',
  rules: {
    // typescript-eslint
    // 禁止空函数
    '@typescript-eslint/no-empty-function': 'error',
    // 允许指令注释
    '@typescript-eslint/ban-ts-comment': 'off',
    // 禁止未使用的变量
    '@typescript-eslint/no-unused-vars': 'error',
    // 允许使用 require 语句
    '@typescript-eslint/no-var-requires': 'off',
    // 允许使用any类型
    '@typescript-eslint/no-explicit-any': 'off',
    // 允许!非空断言
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 允许函数和类方法的无需显式返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 允许导出函数和类的公共类方法的无需显式返回和参数类型
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
}
