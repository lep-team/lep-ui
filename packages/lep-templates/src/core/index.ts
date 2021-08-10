// import path from 'path';
// import fs from 'fs-extra';
// import chalk from 'chalk';
// import ora from 'ora';
// import execa from 'execa';

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const execa = require('execa');
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

    const pulling = ora(`Pulling template...`);
    pulling.start();
    try {
      const repository = `github:lep-team/lep-ui#${this.template}`;

      await loadRemote(repository, this.context);
      pulling.succeed();
      console.log(chalk.green('Template pulled successfully'));
    } catch (error) {
      pulling.fail();
      console.log(chalk.red('Template pull failed'), error);
    }

    const packageFile = path.resolve(this.context, 'package.json');
    fs.writeJsonSync(packageFile, this.initPkg(packageFile));

    this.run('git init');

    const install = ora(`Installing CLI plugins. This might take a while...`);
    install.start();

    this.run('npm install');

    install.succeed();
    console.log(chalk.green('Installed'));
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
