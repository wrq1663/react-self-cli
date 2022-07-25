"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var create_1 = __importDefault(require("./create"));
/* create 创建项目 */
commander_1.program
    .command('create <name>')
    .description('create a react project ')
    .action(function (name) {
    (0, create_1.default)(name);
});
commander_1.program.parse(process.argv);
