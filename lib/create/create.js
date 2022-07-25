"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
function default_1(info) {
    /* 创建文件 */
    console.log(chalk_1.default.green('------开始构建-------'));
    /* 找到template文件夹下的模版项目 */
    var sourcePath = path_1.default.resolve(__dirname, '../../templete');
    fs_extra_1.default.copy(sourcePath, process.cwd()).then(function (res) {
        revisePackageJson(info, path_1.default.resolve(__dirname, '../../templete'));
    }).catch(function (e) {
        console.log(chalk_1.default.green('------构建失败-------'));
    });
}
exports.default = default_1;
function revisePackageJson(res, sourcePath) {
    // return new Promise((resolve, reject) => {
    //   try {
    //     const paJson = fs.readJSONSync(path.resolve(sourcePath, './package.json'))
    //     for (let key in res) {
    //       paJson[key] = res[key]
    //     }
    //     fs.outputJsonSync(path.resolve(process.cwd(), './package.json'), paJson)
    //     resolve(true)
    //   } catch (e) {
    //     reject(false)
    //   }
    // })
    fs_extra_1.default.readFile(path_1.default.resolve(process.cwd(), 'package.json'), 'utf8', function (err, data) {
        for (var key in res) {
            var re = new RegExp("<=config.".concat(key, "=>"), 'g');
            var formatted = data.replace(re, "".concat(res[key]));
            fs_extra_1.default.writeFile('package.json', formatted, 'utf8', function (err) {
                if (err)
                    return console.log(err);
            });
        }
    });
}
