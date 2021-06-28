/**
 * 深冻结数据
 * @param obj
 */
function deepFreeze (obj) {
    Object.freeze(obj);
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (typeof obj[i] == 'object') {
                deepFreeze(obj[i]);
            }
        }
    }
}

module.exports = deepFreeze
