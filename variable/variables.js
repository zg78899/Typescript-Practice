var score1 = 1;
var score2 = 2;
var defaultScore = 0;
function outer() {
    if (true) {
        var score = 0;
    }
    for (var i = 0; i < 3; i++) {
        setTimeout(function () {
            console.log(i);
        }, 100);
    }
    console.log(score);
}
outer();
