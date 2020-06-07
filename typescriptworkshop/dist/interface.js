var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var myTv = {
    trunOn: function () {
        return true;
    },
    trunOff: function () {
    }
};
function tryTurnOn(tv) {
    tv.trunOn();
}
tryTurnOn(myTv);
;
function ajaxSignUp(data) {
}
ajaxSignUp({
    email: email
});
function createBoard() {
    var cells = [];
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 3; col++) {
            cells.push({
                row: row,
                col: col
            });
        }
    }
    return cells;
}
var board = createBoard();
board[0].piece = {
    move: function (from, to) {
        return true;
    }
};
var todos = [];
function addTodo(todo) {
    todos = __spreadArrays(todos, [todo]);
}
var newTodo = { id: 1, content: 'HTML', completed: false };
addTodo(newTodo);
console.log(todos);
;
var squareFunc = function (num) {
    return num * num;
};
console.log(squareFunc(10));
;
var Todo = (function () {
    function Todo(id, content, completed) {
        this.id = id;
        this.content = content;
        this.completed = completed;
    }
    ;
    return Todo;
}());
var todo = new Todo(1, 'TypeScript', false);
console.log(todo);
;
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.sayHello = function () {
        console.log("Hello " + this.name);
    };
    return Person;
}());
;
function greeter(person) {
    person.sayHello();
}
;
var me = new Person('kim');
greeter(me);
;
var MallarDuck = (function () {
    function MallarDuck() {
    }
    MallarDuck.prototype.quack = function () {
        console.log('QUAK!');
    };
    return MallarDuck;
}());
var RedheadDuck = (function () {
    function RedheadDuck() {
    }
    RedheadDuck.prototype.quack = function () {
        console.log('q~~ack');
    };
    return RedheadDuck;
}());
function makeNoise(duck) {
    duck.quack();
}
makeNoise(new MallarDuck());
makeNoise(new RedheadDuck());
;
function sayHello(person) {
    console.log("Hello " + person.name);
    '';
}
;
var me = { name: 'kim', age: 20 };
sayHello(me);
;
var student = {
    name: 'kim',
    age: 20,
    grade: 3
};
;
;
var webDeveloper = {
    name: 'kim',
    age: 20,
    skills: ['html', 'cas', 'javascript']
};
var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    return Person;
}());
var developer = {
    name: 'kim',
    age: 20,
    skills: ['HTML', 'KIM']
};
//# sourceMappingURL=interface.js.map