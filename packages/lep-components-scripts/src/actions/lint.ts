import { ESLint } from 'eslint';
import { Console } from '../utils';
import baseConfig from '@lep-team/eslint-config';
import { MODULE_EXTENSIONS } from '../constant';

export default async (path = './components'): Promise<void> => {
  const cwd = process.cwd();
  const eslint = new ESLint({
    cwd,
    extensions: MODULE_EXTENSIONS,
    fix: true,
    baseConfig
  });

  try {
    const results: Array<ESLint.LintResult> = await eslint.lintFiles(path);
    await ESLint.outputFixes(results);
    const errorFiles: Array<ESLint.LintResult> = results.filter(
      (result: ESLint.LintResult) => {
        return result.messages.length > 0;
      }
    );
    errorFiles.forEach((file: ESLint.LintResult) => {
      const { filePath, messages } = file;
      Console('');
      Console(filePath, 2);
      messages.forEach((msg) =>
        Console(`${msg.message}\nline: ${msg.line}, column: ${msg.column}`, 2)
      );
    });
  } catch (error) {
    Console(error.message, 2);
  }
};
