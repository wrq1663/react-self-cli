import chalk from "chalk"
import fs from 'fs-extra'
import path, { resolve } from "path"
import npm from "../utils/npm"

type infoType = {
  [key: string]: string,
}

export default function (info: infoType) {
  /* 创建文件 */
  console.log(chalk.green('------开始构建-------'))
  /* 找到template文件夹下的模版项目 */
  const sourcePath = path.resolve(__dirname, '../../templete')
  fs.copy(sourcePath, process.cwd()).then(res => {
    revisePackageJson(info, path.resolve(__dirname, '../../templete'), function () { 
      console.log(chalk.green('------安装依赖-------'))
      const installNpm = npm()
      installNpm(function(){
        console.log(chalk.green('------安装成功-------'))
      })
     })
  }).catch(e => {
    console.log(chalk.green('------构建失败-------'))
  })
}

function revisePackageJson(res: infoType, sourcePath: string, sucessCb: Function) {
  fs.readFile(path.resolve(process.cwd(), 'package.json'), 'utf8', function (err, data) {
    for (var key in res) {
      let re = new RegExp(`<=config.${key}=>`, 'g');
      let formatted = data.replace(re, `${res[key]}`)
      fs.writeFile('package.json', formatted, 'utf8', function (err) {
        if (err) return console.log(err);
        console.log(chalk.green('------构建成功-------'))
        sucessCb && sucessCb()
      })
    }
  })
}