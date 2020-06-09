var LocalDB = (function () {
    function LocalDB(localSotrageKey) {
        this.localSotrageKey = localSotrageKey;
    }
    LocalDB.prototype.add = function (v) {
        localStorage.setItem(this.localSotrageKey, JSON.stringify(v));
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
//# sourceMappingURL=generic2.js.map