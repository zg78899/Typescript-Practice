function createPromise(x, timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(x);
        }, timeout);
    });
}
createPromise(10, 100)
    .then(function (v) { return console.log(v); });
function createTuple2(v, v2) {
    return [v, v2];
}
function createTuple3(v, v2, v3) {
    return [v, v2, v3];
}
var t1 = createTuple2("user", 1000);
t1[1].
    t[0].;
//# sourceMappingURL=generic.js.map