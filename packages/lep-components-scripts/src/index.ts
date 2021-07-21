#!/usr/bin/env node
import { program } from "commander";
import pkg from "../package.json";

import Actions from "./actions";

program.version(pkg.version);

program.command("build").description("build components").action(Actions.build);

program
  .command("lint [path]")
  .description("lint codes")
  .action(Actions.lint);

program
  .command("test")
  .option("-watch", "watch test")
  .description("validate test components")
  .action(Actions.test);

program
  .command("site [order]")
  .description("document for your components")
  .action(Actions.site);

program.parse(process.argv);
