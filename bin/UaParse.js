#!/usr/bin/env node
"use strict";
/**
 * Created by rocky on 17/2/17.
 */
var uaParse = require("../ua");
var program = require("commander");
var colors = require("colors");
var fs = require("fs");
var mkdirp = require("mkdirp");
var utils = require("../utils/");
var pg = require("../package.json");
var path = require("path");

//展示红色错误
function make_red(txt) {
    return colors.red(txt);
}
program
    .version(pg.version)
    .usage('[options]')
    .option("-v, --version", pg.version)
    .option("-f, --file <filepath>", "xls file path")
    .option("-o, --outfile <outfile>", "outfile path");
program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log("    $ UaParse -f <file> -o <outfile>");
    console.log('');
});
program.parse(process.argv);

var file = program.file;
var outfile = program.outfile;

if (!file || !outfile ) {
    program.outputHelp(make_red);
    process.exit(1);
}
if(!fs.existsSync(file)) {
    console.log("Error:" ,make_red(file + " is not exist"));
    process.exit(1);
}
var paths = path.parse(outfile);

uaParse.formatXls(file, function(data) {
    try {
        if(!fs.existsSync(paths.dir)) {
            mkdirp.sync(paths.dir);
        }
        fs.writeFileSync(outfile, utils.formatJson(data), "utf8");
        console.log(colors.green("Success: 输出文件成功：" + outfile));
    } catch(e) {
        console.log(colors.red("Error"), e);
    }
});
