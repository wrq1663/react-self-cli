"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = __importDefault(require("child_process"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var currentPath = process.cwd() + '/node_modules/react-webpack-cf';
/**
 *
 * @param option option == start 启动项目  option == build  打包项目
 * @returns
 */
function default_1(type) {
    return new Promise(function (resolve, reject) {
        //webpackcongifig是否存在
        if (!fs_extra_1.default.existsSync(currentPath)) {
            console.log(chalk_1.default.red('react-webpack-cf does not exist , please install react-webpack-cf'));
            reject('react-webpack-cf does not exist , please install react-webpack-cf');
        }
        //开启子进程
        var children = child_process_1.default.fork(path_1.default.resolve(currentPath, './index.js'));
        children.on('message', function (message) {
            var msg = JSON.parse(message);
            if (msg.type === 'end') {
                /* 关闭子进程 */
                children.kill();
                resolve(void 0);
            }
            else if (msg.type === 'error') {
                /* 关闭子进程 */
                children.kill();
                reject();
            }
        });
        children.send(JSON.stringify({
            cwdPath: process.cwd(),
            type: type || 'build'
        }));
    });
}
exports.default = default_1;
;
