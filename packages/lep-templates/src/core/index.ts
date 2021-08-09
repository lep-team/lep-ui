import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import execa from 'execa';
import { ETemplateTypes, ICreatorOptions } from '../types';

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

  public create() {
    const templatesDir = path.join(__dirname, '../templates');
    const targetTemplateDir = path.resolve(templatesDir, this.template);
    this.context = path.resolve(process.cwd(), this.pkg.name);

    if (fs.existsSync(this.context)) {
      console.log(chalk.red(`The ${this.pkg.name} folder is already exists!`));
      process.exit(0);
    }

    if (!fs.existsSync(targetTemplateDir)) {
      console.log(chalk.red(`There is no such template`));
      process.exit(0);
    }

    try {
      fs.copySync(targetTemplateDir, this.context);
    } catch (err) {
      console.error('fs copy failed', err);
    }

    const packageFile = path.resolve(this.context, 'package.json');
    fs.writeJsonSync(packageFile, this.initPkg(packageFile));

    this.run('git init');
    console.log('⚙\u{fe0f} Installing CLI plugins. This might take a while...');

    this.run('npm install');
    console.log('Installed');
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
