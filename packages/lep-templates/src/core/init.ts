import { ETemplateTypes, ICreatorOptions } from './../types';
const path = import('path');
const fs = import('fs-extra');
const chalk = import('chalk');
const execa = import('execa');

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

  async create() {
    const pkg = this.getPkgInit();
    const templatesDir = (await path).join(__dirname, '../templates');
    const templateDir = (await path).resolve(templatesDir, this.template);
    console.log(templateDir);
    const targetDir = (await path).resolve(process.cwd(), pkg.name);

    this.context = targetDir;

    if ((await fs).existsSync(targetDir)) {
      console.log(
        (await chalk).red(`The ${pkg.name} folder is already exists!`)
      );
      process.exit(0);
    }

    if (!(await fs).existsSync(templateDir)) {
      console.log((await chalk).red(`There is no such template`));
      process.exit(0);
    }

    console.log('拷贝目录');

    //拷贝目录
    (await fs).copy(templateDir, targetDir, function (err) {
      if (err) return console.error(err);
      console.log('success!');
    });

    await this.writeFileTree(targetDir, {
      'package.json': JSON.stringify(pkg, null, 2)
    });

    await this.run('git init');
    console.log('完成2');
    await this.run('npm install');
    console.log('完成3');

    // console.log('⚙\u{fe0f} Installing CLI plugins. This might take a while...')
    // await this.run('npm install')
  }

  private async run(command: string, args?: any) {
    return (await execa)(command, args, { cwd: this.context });
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
    Object.keys(files).forEach(async (name) => {
      const filePath = (await path).join(dir, name);
      (await fs).ensureDirSync((await path).dirname(filePath));
      (await fs).writeFileSync(filePath, files[name]);
    });
  }
}
const test = new Creator(
  {
    name: 'demo-proj'
  },
  ETemplateTypes.REACT_PC_COMPONENT
);

test.create();
