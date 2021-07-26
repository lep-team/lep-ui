import chalk from 'chalk';
import execa from 'execa';
import ora from 'ora';
import { existsSync, statSync } from 'fs-extra';
import * as Compiler from './complier';

function Console(msg: string, level = 0): void {
  switch (level) {
    case 0:
      console.log(msg);
      break;
    case 1:
      console.log(chalk.yellow(msg));
      break;
    case 2:
      console.log(chalk.red(msg));
      break;
    default:
      break;
  }
}

async function CheckCmdExist(cmd: string, options: string[]): Promise<void> {
  await execa(cmd, options, {
    cwd: process.cwd()
  });
}

async function RunCmd(cmd: string, options: string[]): Promise<void> {
  const spinner = ora(`start run ${cmd}`).start();
  try {
    await execa(cmd, options, {
      cwd: process.cwd()
    });
    spinner.succeed(`${cmd} run succed`);
  } catch (error) {
    spinner.fail(`${cmd} run failed  ${error.message}`);
  }
}

function existsPath(path: string) {
  const isExist = existsSync(path);
  if (!isExist) {
    throw Error(`cant not find path: ${path}`);
  }
}

function setProcessEnv(envName: string, value: string) {
  if (!envName) {
    throw Error('envName must not be undefined');
  }
  process.env[envName] = value;
}

function getProcessEnv(envName: string) {
  if (!envName) {
    throw Error('envName must not be undefined');
  }
  return process.env[envName];
}

function isDirectory(path: string) {
  const statObj = statSync(path);
  return statObj.isDirectory();
}

export {
  Compiler,
  Console,
  RunCmd,
  CheckCmdExist,
  existsPath,
  setProcessEnv,
  getProcessEnv,
  isDirectory
};
