"use strict";
/**
 * Created by rocky on 17/2/17.
 */
/**
 * 格式化json对象
 * @param data
 * @param space
 */
exports.formatJson = function formatJson(data, space) {
    space = space || 4;
    if(typeof data !== 'object' || data === null) {
        data = {};
    }
    var seen = [];
    return JSON.stringify(data, function(key,val) {
        if (!val || typeof val !== 'object') {
            return val;
        }
        if(seen.indexOf(val) !== -1){
            return '[Circular]';
        }
        seen.push(val);
        return val;
    }, space);
}

