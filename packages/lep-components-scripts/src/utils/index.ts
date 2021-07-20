import chalk from "chalk";
import execa from 'execa';
import ora from "ora";

function Console (msg: string, level: number = 0): void {
  switch (level) {
    case 0:
      console.log(msg)
      break;
    case 1:
      console.log(chalk.yellow(msg))
      break;
    case 2:
      console.log(chalk.red(msg))
      break;
    default:
      break;
  }
}

async function CheckCmdExist (cmd: string, options: string[]): Promise<void> {
  await execa(cmd, options, {
    cwd: process.cwd()
  })
}

async function RunCmd (cmd: string, options: string[]): Promise<void> {
  const spinner = ora(`start run ${cmd}`).start();
  try {
    await execa(cmd, options, {
      cwd: process.cwd()
    })
    spinner.succeed(`${cmd} run succed`)
  } catch (error) {
    spinner.fail(`${cmd} run failed  ${error.message}`)
  }
}

export {
  Console,
  RunCmd,
  CheckCmdExist
}