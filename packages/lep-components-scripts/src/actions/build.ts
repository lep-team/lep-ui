import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import { Compiler, setProcessEnv, existsPath, isDirectory } from '../utils';
import { MODULE_NAME } from '../constant';

type Options = { entry: string; output: string };

async function compilerDir(entryPath: string, output: string) {
  const statObj = fs.statSync(entryPath);
  const isDir = statObj.isDirectory();
  if (isDir) {
    fs.mkdirSync(output);
    const dirs = fs.readdirSync(entryPath);
    for (let i = 0; i < dirs.length; i++) {
      const dirPath = dirs[i];
      const absPath = path.resolve(entryPath, dirPath);
      const outputs = path.resolve(output, dirPath);
      await compilerDir(absPath, outputs);
    }
  } else {
    await comilerFile(entryPath, output);
  }
}

async function comilerFile(filePath: string, output: string) {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.js':
    case '.jsx':
    case '.ts':
    case '.tsx':
      {
        const code = await Compiler.compilerJs(filePath);
        fs.outputFileSync(output, code);
      }
      break;
    case '.css':
      {
        const code = await Compiler.compilerCss(filePath);
        fs.outputFileSync(output, code);
      }
      break;
    case '.less':
      {
        const code = await Compiler.compilerLess(filePath);
        fs.copyFileSync(filePath, output);
        fs.outputFileSync(output, code);
      }
      break;
    case '.scss':
      {
        const code = await Compiler.compilerSass(filePath);
        fs.copyFileSync(filePath, output);
        fs.outputFileSync(output, code);
      }
      break;
    default:
      fs.copyFileSync(filePath, output);
      break;
  }
}

function genEnrtyDir(enrtyPath: string) {
  const isDir = isDirectory(enrtyPath);
  if (!isDir) {
    throw Error(`path：${path} is not directory`);
  }
  try {
    existsPath(enrtyPath);
  } catch (error) {
    fs.mkdirSync(enrtyPath);
  }
}

function genEntryFile(entryPath: string) {
  const entryFilePath = path.resolve(entryPath, 'index');
  try {
    existsPath(entryFilePath);
  } catch (error) {
    const dirs = fs.readdirSync(entryPath);
    let code = ``;
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      const absPath = path.resolve(entryPath, dir);
      const isDir = isDirectory(absPath);

      if (isDir && fs.existsSync(path.resolve(absPath, 'index'))) {
        code += `export { default as ${dir} } from './${dir}';\n`;
      }
    }
    fs.outputFileSync(entryFilePath, code);
  }
}

function buildModule(module = 'es', entryPath: string, output: string) {
  const modulePath = path.resolve(output, module);
  fs.mkdirSync(modulePath);
  setProcessEnv(MODULE_NAME, module);
  compilerDir(entryPath, output);
}

function cleanDir(cleanPath: string) {
  fs.removeSync(cleanPath);
}

async function buildUmdModule(enrtyPath: string, output: string) {
  const entryFilePath = path.resolve(enrtyPath, 'index');
  genEntryFile(entryFilePath);
  output = path.resolve(output, 'index.min.js');
  await Compiler.compilerPkg(entryFilePath, output);
}

export default async (options: Options) => {
  const basePath = process.cwd();
  const { entry = 'components', output = 'dist' } = options;
  const entryPath = path.resolve(basePath, entry);
  const outputPath = path.resolve(basePath, output);

  const tasks = [
    {
      task: 'cleanDir',
      action: cleanDir.bind(this, outputPath)
    },
    {
      task: 'genEntryDir',
      action: genEnrtyDir.bind(this, entryPath)
    },
    {
      task: 'buildEsModule',
      action: buildModule.bind(this, 'es', entryPath, outputPath)
    },
    {
      task: 'buildLibModule',
      action: buildModule.bind(this, 'lib', entryPath, outputPath)
    },
    {
      task: 'buildUmdModule',
      action: buildUmdModule.bind(this, entryPath, outputPath)
    }
  ];

  for (let i = 0; i < tasks.length; i++) {
    const { task, action } = tasks[i];
    const spinner = ora(`start run task: ${task}`).start();
    try {
      await action();
      spinner.succeed('task action run success!');
    } catch (error) {
      spinner.fail(error);
      process.exit(1);
    }
  }
};
