#!/usr/bin/env node
import { program } from "commander";
import pkg from "../package.json";

import Actions from "./actions";

program.version(pkg.version);

program
  .command("build")
  .option("--entry <dir>", "entry dir")
  .option("--output <dir>", "output dir")
  .description("build components")
  .action(Actions.build);

program
  .command("lint [path]")
  .description("lint codes")
  .action(Actions.lint);

program
  .command("test")
  .option("-w --watch", "watch test")
  .option("-u --updateSnapshot", "updateSnapshot")
  .description("validate test components")
  .action(Actions.test);

program
  .command("site [order]")
  .description("document for your components")
  .action(Actions.site);

program.parse(process.argv);
