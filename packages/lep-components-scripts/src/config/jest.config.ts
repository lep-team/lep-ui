import { existsSync } from 'fs-extra';
import path from 'path';

const defaultConfig = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // 模块文件后缀名
  collectCoverage: true, // 测试覆盖率信息
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    '!**/demo/**',
    '!**/test/**'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/packages/'],
  coverageReporters: ['html', 'lcov', 'text'],
  coverageDirectory: './coverage', // 输出位置
  setupFiles: [path.resolve(__dirname, './test/setupFile.js')]
};

const jestConfigPath = path.resolve(process.cwd(), 'jest.config');
let jestConfig = {};

if (existsSync(jestConfigPath)) {
  jestConfig = require(jestConfigPath);
}

export default {
  ...defaultConfig,
  ...jestConfig
};
