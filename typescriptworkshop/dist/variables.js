var score1 = 1;
var score2 = 2;
var defaultScore = 0;
function outer() {
    if (true) {
        var score = void 0;
        score = 30;
    }
    var _loop_1 = function (i) {
        setTimeout(function () {
            console.log(i);
        }, 100);
    };
    for (var i = 0; i < 3; i++) {
        _loop_1(i);
    }
    console.log(score);
}
outer();
//# sourceMappingURL=variables.js.map