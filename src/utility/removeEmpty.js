var ObjectId = require('mongoose').Types.ObjectId;
module.exports = function removeEmpty(obj) {
    if ( ObjectId.isValid(obj) ) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj
            .map(v => (v && typeof v === 'object') ? removeEmpty(v) : v)
            .filter(v => !(v == null));
    } else {
        return Object.entries(obj)
            .map(([k, v]) => [k, v && typeof v === 'object' ? removeEmpty(v) : v])
            .reduce((a, [k, v]) => (v == null ? a : (a[k] = v, a)), {});
    }
}