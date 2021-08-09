import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import symbols from 'log-symbols';
import execa from 'execa';
import { ETemplateTypes, ICreatorOptions } from '../types';
import { loadRemote } from '../utils';

interface ICreatorApis {
  create(): void;
}

export class Creator implements ICreatorApis {
  public readonly pkg: ICreatorOptions;
  public readonly template: ETemplateTypes;
  private context: string;

  constructor(pkg: ICreatorOptions, template: ETemplateTypes) {
    this.pkg = pkg;
    this.template = template;
    this.context = '';
  }

  public async create() {
    if (this.template in ETemplateTypes) {
      console.log(chalk.red(`There is no such template`));
      process.exit(0);
    }

    this.context = path.resolve(process.cwd(), this.pkg.name);

    if (fs.existsSync(this.context)) {
      console.log(chalk.red(`The ${this.pkg.name} folder is already exists!`));
      process.exit(0);
    }

    let spinner = ora(`Pulling template...`);
    spinner.start();
    try {
      const repository = `direct:https://github.com/lep-team/lep-ui/tree/develop/packages/lep-templates/templates/${this.template}`;

      console.log('repository', repository);

      await loadRemote(repository, this.context);

      spinner.succeed();
      console.log(symbols.success, chalk.green('Template pulled successfully'));

      const packageFile = path.resolve(this.context, 'package.json');
      fs.writeJsonSync(packageFile, this.initPkg(packageFile));

      this.run('git init');

      spinner = ora(`Installing CLI plugins. This might take a while...`);
      spinner.start();

      this.run('npm install');

      spinner.succeed();
      console.log(symbols.success, chalk.green('Installed'));
    } catch (error) {
      spinner.fail();
      console.log(symbols.error, chalk.red('Template pull failed'), error);
    }
  }

  private initPkg(packageFile: string) {
    const packageObj = fs.readJsonSync(packageFile);
    const { name } = this.pkg;
    return {
      ...packageObj,
      name,
      version: '1.0.0'
    };
  }

  private run(command: string, args?: string[]) {
    return execa.sync(command, args, { cwd: this.context });
  }
}
