#! /usr/bin/env node
const internetAvailable = require("internet-available");

import {init} from './init'
import * as chalk from 'chalk'

internetAvailable({
  timeout: 5000,
  // 3次连接失败, 认为客户端网络连接有问题
  retries: 3
}).then(() => {
  // 网络正常，执行初始化... ...
  init()
}).catch(() => {
  console.log(chalk.red("oh, Sorry, it seems that your connect is off, please check your computer net... ..."));
});
