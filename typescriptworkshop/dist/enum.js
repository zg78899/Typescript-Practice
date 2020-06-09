var StarBucksGrade;
(function (StarBucksGrade) {
    StarBucksGrade[StarBucksGrade["WELCOME"] = 0] = "WELCOME";
    StarBucksGrade[StarBucksGrade["DDDD"] = 1] = "DDDD";
    StarBucksGrade[StarBucksGrade["GREEN"] = 2] = "GREEN";
    StarBucksGrade[StarBucksGrade["GOLD"] = 3] = "GOLD";
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
console.log(StarBucksGrade[0]);
console.log(StarBucksGrade["WELCOME"]);
//# sourceMappingURL=enum.js.map