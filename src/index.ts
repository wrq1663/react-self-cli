import { program } from "commander";
import create from './create'


/* create 创建项目 */
program
  .command('create <name>')
  .description('create a react project ')
  .action(function (name) {
    create(name)
  })

program.parse(process.argv);