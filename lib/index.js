"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = require("commander");
var create_1 = __importDefault(require("./create"));
var start_1 = __importDefault(require("./start"));
/* create 创建项目 */
commander_1.program
    .command('create <name>')
    .description('create a react project ')
    .action(function (name) {
    (0, create_1.default)(name);
});
/* create 启动项目 */
commander_1.program
    .command('start')
    .description('start with webpack-dev-server ')
    .action(function () {
    console.log((0, chalk_1.default)('-------开始启动-------'));
    (0, start_1.default)('start').then(function (res) {
        console.log((0, chalk_1.default)('-------✅  ✅启动完成-------'));
    });
});
commander_1.program.parse(process.argv);
