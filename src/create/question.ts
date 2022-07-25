import inquirer from "inquirer"

const questionList: inquirer.QuestionCollection<any> = [
  {
    name: 'name',
    message: '请输入项目名称？',
    when: res => Boolean(res.conf) /* 是否进行 */
  },
  {
    name: 'author',
    message: '请输入作者？',
    when: res => Boolean(res.conf)
  }
]

const question = async () => { 
  console.log('wrq')
  const res = await inquirer.prompt(questionList)
  return res
 }

export default question