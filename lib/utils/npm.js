"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var which_1 = __importDefault(require("which"));
var child_process_1 = __importDefault(require("child_process"));
/**
 * 找到npm
 */
function default_1(installArg) {
    if (installArg === void 0) { installArg = ['install']; }
    var npm = findNpm();
    return function (done) {
        /* 执行命令 */
        runCmd(which_1.default.sync(npm), installArg, function () {
            /* 执行成功回调 */
            done && done();
        });
    };
}
exports.default = default_1;
function findNpm() {
    var npms = process.platform === 'win32' ? ['npm.cmd'] : ['npm'];
    for (var i = 0; i < npms.length; i++) {
        try {
            which_1.default.sync(npms[i]);
            console.log('use npm: ' + npms[i]);
            return npms[i];
        }
        catch (e) {
            throw e;
        }
    }
    throw new Error('please install npm');
}
function runCmd(cmd, args, fn) {
    var runner = child_process_1.default.spawn(cmd, args, { stdio: 'inherit' });
    runner.on('close', function (code) {
        if (fn) {
            fn(code);
        }
    });
}
