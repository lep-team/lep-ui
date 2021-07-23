import path = require('path');
import fs = require('fs-extra');
import chalk = require('chalk');
import execa = require('execa');
import { ETemplateTypes, ICreatorOptions } from '../types';

interface ECreator {
  create(): void;
}

export class Creator implements ECreator {
  private readonly pkg: ICreatorOptions;
  private readonly template: ETemplateTypes;
  private context: string;

  constructor(pkg: ICreatorOptions, template: ETemplateTypes) {
    this.pkg = pkg;
    this.template = template;
  }

  public create() {
    const pkg = this.getPkgInit();
    const templatesDir = path.join(__dirname, '../templates');
    const templateDir = path.resolve(templatesDir, this.template);
    const targetDir = path.resolve(process.cwd(), pkg.name);

    this.context = targetDir;

    if (fs.existsSync(targetDir)) {
      console.log(chalk.red(`The ${pkg.name} folder is already exists!`));
      // process.exit(0);
    }

    if (!fs.existsSync(templateDir)) {
      console.log(chalk.red(`There is no such template`));
      process.exit(0);
    }

    this.writeFileTree(targetDir, {
      'package.json': JSON.stringify(pkg, null, 2)
    });

    fs.copy(templateDir, targetDir, function (err) {
      if (err) return console.error(err);
      console.log('success!');
    });

    this.run('git init');
    // console.log('⚙\u{fe0f} Installing CLI plugins. This might take a while...');
    // this.run('npm install');
  }

  private run(command: string, args?: string[]) {
    return execa(command, args, { cwd: this.context });
  }

  private getPkgInit() {
    const { name } = this.pkg;
    return {
      name,
      version: '0.1.0',
      devDependencies: {
        react: 'latest'
      }
    };
  }

  private writeFileTree(dir, files) {
    Object.keys(files).forEach((name) => {
      const filePath = path.join(dir, name);
      fs.ensureDirSync(path.dirname(filePath));
      fs.writeFileSync(filePath, files[name]);
    });
  }
}
