import fs from "fs-extra";
import path from "path";
import ora from "ora";

type Options = { entry: string; output: string };

function compilerDir(entryPath: string, output: string) {
  const statObj = fs.statSync(entryPath);
  const isDir = statObj.isDirectory();
  if (isDir) {
    fs.mkdirSync(output);
    const dirs = fs.readdirSync(entryPath);
    dirs.forEach((dirPath) => {
      const absPath = path.resolve(entryPath, dirPath);
      const outputs = path.resolve(output, dirPath);
      compilerDir(absPath, outputs);
    });
  } else {
    comilerFile(entryPath, output);
  }
}

function comilerFile(filePath: string, output: string) {
  fs.copyFileSync(filePath, output);
  const ext = path.extname(filePath);
  switch (ext) {
    case ".js":
    case ".jsx":
      
      break;
    case ".ts":
    case ".tsx":
      break;
    default:
      break;
  }
}

export default async (options: Options) => {
  const basePath = process.cwd();
  const { entry = "components", output = "dist" } = options;
  const entryPath = path.resolve(basePath, entry);
  const outputPath = path.resolve(basePath, output);

  const tasks = [
    {
      task: "compilerDir",
      action: compilerDir,
    },
  ];

  for (let i = 0; i < tasks.length; i++) {
    const { task, action } = tasks[i];
    const spinner = ora(`start run task: ${task}`).start();
    try {
      await action.call(this, entryPath, outputPath);
      spinner.succeed("task action run success!");
    } catch (error) {
      spinner.fail(error);
      process.exit(1);
    }
  }
};
