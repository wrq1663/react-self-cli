import chalk from "chalk";
import { program } from "commander";
import create from './create'
import start from './start'


/* create 创建项目 */
program
  .command('create <name>')
  .description('create a react project ')
  .action(function (name) {
    create(name)
  })
/* create 启动项目 */
program
  .command('start')
  .description('start with webpack-dev-server ')
  .action(function () {
    console.log(chalk('-------开始启动-------'))
    start('start').then(res=>{
      console.log(chalk('-------✅  ✅启动完成-------'))
    })
  })

program.parse(process.argv);