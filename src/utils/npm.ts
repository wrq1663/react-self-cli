import which from 'which'
import child_process from 'child_process'

/**
 * 找到npm
 */
export default function (installArg = ['install']) {
  const npm = findNpm();
  return function (done: Function) {
    /* 执行命令 */
    runCmd(which.sync(npm), installArg, function () {
      /* 执行成功回调 */
      done && done()
    })
  }
}

function findNpm(): string {
  const npms = process.platform === 'win32' ? ['npm.cmd'] : ['npm']
  for (let i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i])
      console.log('use npm: ' + npms[i])
      return npms[i]
    } catch (e) {
      throw e
    }
  }
  throw new Error('please install npm')
}
function runCmd(cmd: string, args: Array<string>, fn: Function) {
  const runner = child_process.spawn(cmd, args, { stdio: 'inherit' })
  runner.on('close', function (code) {
    if (fn) {
      fn(code)
    }
  })
}
