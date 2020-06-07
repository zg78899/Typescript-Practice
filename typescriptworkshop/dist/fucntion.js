function add(x, y) {
    return x + y;
}
var result = add(1, 2);
function buildUserInfo(name, email) {
    return { name: name, email: email };
}
var user = buildUserInfo();
var add2 = function (a, b) { return a + b; };
function store(type) {
    if (type === "통조림") {
        return { a: "통도림" };
    }
    else if (type === "아이스크림") {
        return { b: "아이스크림" };
    }
    else {
        throw new Error('unsupported type');
    }
}
var s = store("아이스크림");
s.b;
//# sourceMappingURL=fucntion.js.map