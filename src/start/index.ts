import chalk from 'chalk'
import child_process from 'child_process'
import fs from 'fs-extra'
import path from 'path'

const currentPath = process.cwd() + '/node_modules/react-webpack-cf'

/**
 * 
 * @param option option == start 启动项目  option == build  打包项目
 * @returns 
 */
export default function (type: string) {
  return new Promise((resolve, reject) => {
    //webpackcongifig是否存在
    if (!fs.existsSync(currentPath)) {
      console.log(chalk.red('react-webpack-cf does not exist , please install react-webpack-cf'))
      reject('react-webpack-cf does not exist , please install react-webpack-cf')
    }

    //开启子进程
    const children = child_process.fork(path.resolve(currentPath, './index.js'))
    children.on('message', (message: string) => {
      const msg = JSON.parse(message)
      if (msg.type === 'end') {
        /* 关闭子进程 */
        children.kill()
        resolve(void 0)
      } else if (msg.type === 'error') {
        /* 关闭子进程 */
        children.kill()
        reject()
      }
    })
    children.send(JSON.stringify({
      cwdPath: process.cwd(),
      type: type || 'build'
    }))

  })
};