import path from 'path';
import { runCLI } from 'jest';
import { Console } from '../utils';

type Options = { watch: boolean; updateSnapshot: boolean };

export default async (options: Options): Promise<void> => {
  const { watch, updateSnapshot } = options;
  const cwd = process.cwd();
  const configPath = path.resolve(__dirname, '../config/jest.config.js');
  const config = {
    rootDir: cwd,
    watch,
    updateSnapshot,
    passWithNoTests: true,
    config: configPath
  } as any;

  try {
    const {
      results: { success }
    } = await runCLI(config, [cwd]);
    if (!success && !watch) {
      process.exit(1);
    }
  } catch (error) {
    Console(error.message, 2);
    if (!watch) {
      process.exit(1);
    }
  }
};
