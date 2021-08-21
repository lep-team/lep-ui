/**
 * @file commitlint 配置
 * commit message: <type>: <subject>(注意冒号后面有空格)
 *
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init', // 初始提交
        'feat', // 新功能（feature）
        'perf', // 优化
        'fix', // 修补bug
        'docs', // 文档（documentation）
        'style', // 格式（不影响代码运行的变动）
        'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
        'build', // 编译构建
        'test', // 增加测试
        'revert', // 回滚
        'config', // 构建过程或辅助工具的变动
        'chore' // 其他改动
      ]
    ]
  }
};
