var hello = 'hello';
var hell2 = 'hlllo2';
var timeout = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('1 sec');
    }, 1000);
});
timeout.then(console.log);
import add from './utils.js';
var returnValue = add(1, 2);
console.log(returnValue);
//# sourceMappingURL=hello.js.map