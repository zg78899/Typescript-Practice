var StarBucksGrade;
(function (StarBucksGrade) {
    StarBucksGrade[StarBucksGrade["WELCOME"] = 0] = "WELCOME";
    StarBucksGrade[StarBucksGrade["GREEN"] = 1] = "GREEN";
    StarBucksGrade[StarBucksGrade["GOLD"] = 2] = "GOLD";
})(StarBucksGrade || (StarBucksGrade = {}));
function getDisCount(v) {
    switch (v) {
        case StarBucksGrade.WELCOME:
            return 0;
        case StarBucksGrade.GREEN:
            return 5;
        case StarBucksGrade.GOLD:
            return 10;
    }
}
console.log(getDisCount(StarBucksGrade.GREEN));
console.log(StarBucksGrade.GREEN);
console.log(StarBucksGrade);
//# sourceMappingURL=enum.js.map