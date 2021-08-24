import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import execa from 'execa';
import { Compiler, setProcessEnv, existsPath, isDirectory } from '../utils';
import { MODULE_NAME } from '../constant';

type Options = {
  entry: string;
  output: string;
  language: string;
  outputStyle: string;
};

async function compilerDir(entryPath: string, output: string) {
  const statObj = fs.statSync(entryPath);
  const isDir = statObj.isDirectory();
  if (isDir) {
    fs.mkdirSync(output);
    const dirs = fs.readdirSync(entryPath);
    for (let i = 0; i < dirs.length; i++) {
      const dirPath = dirs[i];
      if (dirPath.includes('__tests__')) {
        return;
      }
      const absPath = path.resolve(entryPath, dirPath);
      const outputs = path.resolve(output, dirPath);
      await compilerDir(absPath, outputs);
    }
  } else {
    if (entryPath.includes('.d.ts')) {
      return;
    }
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
        output = output.replace(ext, '.js');
        fs.outputFileSync(output, code);
      }
      break;
    case '.less':
      {
        fs.copyFileSync(filePath, output);
        let code = await Compiler.compilerLess(filePath);
        code = await Compiler.compilerCss(code);
        output = output.replace(ext, '.css');
        fs.outputFileSync(output, code);
      }
      break;
    case '.scss':
      {
        fs.copyFileSync(filePath, output);
        let code = await Compiler.compilerSass(filePath);
        code = await Compiler.compilerCss(code);
        output = output.replace(ext, '.css');
        fs.outputFileSync(output, code);
      }
      break;
    case '.css':
      {
        let code = fs.readFileSync(filePath, 'utf-8');
        code = await Compiler.compilerCss(code);
        fs.outputFileSync(output, code);
      }
      break;
    default:
      break;
  }
}

function genBuildDir(outPath: string) {
  try {
    existsPath(outPath);
  } catch (error) {
    fs.mkdirSync(outPath);
    const isDir = isDirectory(outPath);
    if (!isDir) {
      fs.rmdirSync(outPath);
      throw Error(`path：${path} is not directory`);
    }
  }
}

function genEntryFile(entryPath: string, isJs: boolean, language: string) {
  let entryFilePath = '';
  try {
    if (language.includes('ts')) {
      const extname = ['ts', 'tsx'];
      let isExist = false;
      for (let i = 0; i < extname.length; i++) {
        const ext = extname[i];
        const entryJs = `index.${ext}`;
        entryFilePath = path.resolve(entryPath, entryJs);
        if ((isExist = fs.existsSync(entryFilePath))) {
          break;
        }
      }
      if (!isExist) {
        const entryJs = `index.${language}`;
        entryFilePath = path.resolve(entryPath, entryJs);
        throw Error();
      }
    } else {
      const entryJs = `index.${language}`;
      entryFilePath = path.resolve(entryPath, entryJs);
      existsPath(entryFilePath);
    }
  } catch (error) {
    const dirs = fs.readdirSync(entryPath);
    let code = ``;
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      const absPath = path.resolve(entryPath, dir);
      const isDir = isDirectory(absPath);
      if (isDir && fs.existsSync(path.resolve(absPath, `index.${language}`))) {
        if (isJs) {
          code += `export { default as ${dir} } from './${dir}';\n`;
        } else {
          code += `@import './${dir}/index';\n`;
        }
      }
    }
    fs.outputFileSync(entryFilePath, code);
  }
}

async function buildModule(module = 'es', entryPath: string, output: string) {
  const statObj = fs.statSync(entryPath);
  const isDir = statObj.isDirectory();
  if (!isDir) {
    throw Error(`entryPath is not dir`);
  }
  const modulePath = path.resolve(output, module);
  setProcessEnv(MODULE_NAME, module);
  await compilerDir(entryPath, modulePath);
}

function cleanDir(cleanPath: string) {
  fs.removeSync(cleanPath);
}

async function genDeclaration() {
  const cwd = process.cwd();
  const tsConfigPath = path.resolve(cwd, 'tsconfig.json');
  if (fs.existsSync(tsConfigPath)) {
    execa('tsc', [], {
      cwd
    });
  } else {
    throw Error('cant not find tsconfig.json');
  }
}

async function buildUmdModule(
  enrtyPath: string,
  output: string,
  language: string
) {
  let isTs = false;
  let entryFilePath = '';
  if (language.includes('ts')) {
    isTs = true;
  }
  if (isTs) {
    const extname = ['ts', 'tsx'];
    for (let i = 0; i < extname.length; i++) {
      const ext = extname[i];
      entryFilePath = path.resolve(enrtyPath, `index.${ext}`);
      if (fs.existsSync(entryFilePath)) {
        break;
      }
    }
  } else {
    entryFilePath = path.resolve(enrtyPath, `index.${language}`);
  }
  output = path.resolve(output, 'index.min.js');
  await Compiler.compilerPkg(entryFilePath, output);
}

async function buildStylesEntry(
  enrtyPath: string,
  output: string,
  outputStyle: string
) {
  const entryStyleFilePath = path.resolve(enrtyPath, `index.${outputStyle}`);
  const outputStyleFilePath = path.resolve(output, `index.min.${outputStyle}`);
  switch (outputStyle) {
    case 'less':
      {
        let code = await Compiler.compilerLess(entryStyleFilePath);
        code = await Compiler.compilerCss(code);
        fs.outputFileSync(outputStyleFilePath, code);
      }
      break;
    case 'scss':
      {
        let code = await Compiler.compilerSass(entryStyleFilePath);
        code = await Compiler.compilerCss(code);
        fs.outputFileSync(outputStyleFilePath, code);
      }
      break;
    default:
      {
        const code = await Compiler.compilerCss(entryStyleFilePath);
        fs.outputFileSync(outputStyleFilePath, code);
      }
      break;
  }
}

export default async (options: Options) => {
  const basePath = process.cwd();
  const {
    entry = 'components',
    output = 'dist',
    language = 'ts',
    outputStyle = 'scss'
  } = options;
  const entryPath = path.resolve(basePath, entry);
  const outputPath = path.resolve(basePath, output);
  const isTs = language.includes('ts');
  const tasks = [
    {
      task: 'cleanDir',
      action: cleanDir.bind(this, outputPath)
    },
    {
      task: 'genBuildDir',
      action: genBuildDir.bind(this, outputPath)
    },
    {
      task: 'genEntryJsFile',
      action: genEntryFile.bind(this, entryPath, true, language)
    },
    {
      task: 'genEntryStyleFile',
      action: genEntryFile.bind(this, entryPath, false, outputStyle)
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
      action: buildUmdModule.bind(this, entryPath, outputPath, language)
    },
    {
      task: 'buildStylesEntry',
      action: buildStylesEntry.bind(this, entryPath, outputPath, outputStyle)
    }
  ];

  if (isTs) {
    tasks.push({
      task: 'genDeclaration',
      action: genDeclaration.bind(this)
    });
  }

  for (let i = 0; i < tasks.length; i++) {
    const { task, action } = tasks[i];
    const spinner = ora(`start run task: ${task}`).start();
    try {
      await action();
      spinner.succeed(`task ${task} run success!`);
    } catch (error) {
      spinner.fail(error.message);
      process.exit(1);
    }
  }
};
