import chalk from "chalk";
import execa from 'execa';
import ora from "ora";

function Console (msg: string, level: number) {
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

async function RunCmd (cmd: string, options: string[]) {
  const spinner = ora(`start run ${cmd}`).start();
  try {
    await execa(cmd, options)
    spinner.succeed(`${cmd} run succed`)
  } catch (error) {
    spinner.fail(`${cmd} run failed \n ${error}`)
  }
}

export {
  Console,
  RunCmd
}