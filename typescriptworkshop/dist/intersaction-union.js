var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
;
function createUserAction(u, a) {
    return __assign(__assign({}, u), a);
}
var u = createUserAction({ name: 'jay' }, { do: function () { } });
function compare(x, y) {
    if (typeof x === 'number' && typeof y === 'number') {
        return x === y ? 0 : x > y ? 1 : -1;
    }
    if (typeof x === 'string' && typeof y === 'string') {
        return x.localeCompare(y);
    }
    throw new Error('not supported type');
}
var v = compare("a", 2);
console.log([3, 2, 1].sort(compare));
console.log(["c", "b", "a"].sort(compare));
//# sourceMappingURL=intersaction-union.js.map