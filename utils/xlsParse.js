"use strict";
/**
 * Created by rocky on 17/2/16.
 */
var xlsjs = require("xlsjs");

module.exports = function xlsParse(file, sheetName) {
    var workbook = xlsjs.readFile(file);
    var names;
    var sheets = workbook.Sheets;
    if((names = workbook.SheetNames) && !names.length) {
        return null;
    }
    if(sheetName === null) {
        return xlsjs.utils.sheet_to_json(sheets[names.shift()]);
    } else {
        var tmp = {};
        names.forEach(function(name) {
            tmp[name] = xlsjs.utils.sheet_to_json(sheets[name]);
        });
        return tmp;
    }
}


