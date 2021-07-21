import path from "path";
import { runCLI } from "jest";
import type {Config} from '@jest/types';
import jestConfig from '../../config/jest.config'

export default (options: { watch: Boolean }) => {
  const { watch } = options
  const cwd = process.cwd()
  const configPath = path.resolve(cwd, 'jest.config.ts')

  const config = {
    rootDir: cwd,
    watch,
    config: {}
  } as Config.Argv

  runCLI(config, [cwd])
};
