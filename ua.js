//ua解析收集器
var detector = require("detector");
var async = require("async");
var xlsParse = require("./utils/xlsParse");

//数据累加
function totalizer(a, b) {
    return (parseInt(a, 10) || 0) + (parseInt(b, 10) || 0);
}

//ua解析
exports.formatXls = formatXls;
function formatXls(filePath, cb) {
    cb = typeof cb != 'function'? function() {} : cb;
    var data = xlsParse(filePath, null);
    var result = {};
    async.eachLimit(data, 500, function(row, cb) {
        var parse = detector.parse(row.user_agent);
        var bname = parse.browser.name;
        var dname = parse.device.name;
        var oname = parse.os.name;
        var browser, device, os;
        if(!(browser = result[bname])) {
            browser = result[bname] = {
                device : {},
                os : {},
                cnt : 0
            }
        }
        if(!(device = browser.device[dname]) ) {
            device =  browser.device[dname] = 0;
        }
        if(!(os = browser.os[oname])) {
            os =  browser.os[oname] = {};
        }
        browser.device[dname] = totalizer(browser.device[dname], row.cnt);
        var ov =  oname == "na" ? oname : oname + parse.os.version;
        os[ov] = totalizer(os[ov], row.cnt);
        browser.cnt =  totalizer(browser.cnt, row.cnt);
        cb(null);
    }, function(err) {
        cb(result);
    })
}
