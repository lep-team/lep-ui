import chalk from 'chalk'

// 初始化项目
export function init() {
  console.log(process.version);
  const currentVersion = parseFloat(process.version.slice(1))
  console.log(currentVersion)

}

// module.exports = function () {
//   console.log(process.version);
//   const currentVersion = parseFloat(process.version.slice(1))
//   console.log(currentVersion)
// }
