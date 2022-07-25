import chalk from "chalk";
import create from './create'

//会话list
// const questionList: inquirer.QuestionCollection<any> = [
//   {
//     name: 'name',
//     message: '请输入项目名称？',
//   },
//   {
//     name: 'author',
//     message: '请输入作者？',
//   }
// ]

export default async function (name: string) {

  console.log(chalk.blue(`----欢迎使用mycli，轻松构建 ${name} react项目----`))

  //会话
  // inquirer.prompt(questionList).then(res => {
  // })
  create({name})
};