"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var npm_1 = __importDefault(require("../utils/npm"));
function default_1(info) {
    /* 创建文件 */
    console.log(chalk_1.default.green('------开始构建-------'));
    /* 找到template文件夹下的模版项目 */
    var sourcePath = path_1.default.resolve(__dirname, '../../templete');
    fs_extra_1.default.copy(sourcePath, process.cwd()).then(function (res) {
        revisePackageJson(info, path_1.default.resolve(__dirname, '../../templete'), function () {
            console.log(chalk_1.default.green('------安装依赖-------'));
            var installNpm = (0, npm_1.default)();
            installNpm(function () {
                console.log(chalk_1.default.green('------安装成功-------'));
            });
        });
    }).catch(function (e) {
        console.log(chalk_1.default.green('------构建失败-------'));
    });
}
exports.default = default_1;
function revisePackageJson(res, sourcePath, sucessCb) {
    fs_extra_1.default.readFile(path_1.default.resolve(process.cwd(), 'package.json'), 'utf8', function (err, data) {
        for (var key in res) {
            var re = new RegExp("<=config.".concat(key, "=>"), 'g');
            var formatted = data.replace(re, "".concat(res[key]));
            fs_extra_1.default.writeFile('package.json', formatted, 'utf8', function (err) {
                if (err)
                    return console.log(err);
                console.log(chalk_1.default.green('------构建成功-------'));
                sucessCb && sucessCb();
            });
        }
    });
}
