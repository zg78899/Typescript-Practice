var D = (function () {
    function D() {
    }
    D.prototype.add = function (v) {
        throw new Error("Method not implemented.");
    };
    D.prototype.get = function () {
        throw new Error("Method not implemented.");
    };
    return D;
}());
var LocalDB = (function () {
    function LocalDB(localSotrageKey) {
        this.localSotrageKey = localSotrageKey;
    }
    LocalDB.prototype.add = function (v) {
        localStorage.setItem(this.localSotrageKey, v.serializer());
    };
    LocalDB.prototype.get = function () {
        var v = localStorage.getItem(this.localSotrageKey);
        return (v) ? JSON.parse(V) : null;
    };
    return LocalDB;
}());
;
var userDb = new LocalDB('user');
userDb.add({ name: 'jay' });
var userA = userDb.get();
userA.name;
//# sourceMappingURL=generic3.js.map