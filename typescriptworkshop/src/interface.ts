interface Tv{
  //하나의 타입을 설정한다.
  //행위한다는 것을 기술만을 한다 
  trunOn():boolean; //타입이 boolean이면 반드시 return 값을 boolean으로 나타내주어야한다.
  trunOff():void; // 타입을 아무것도 설정을 안해주면 void타입이다
}
//interface는 실제로 구현체 바디가 없다.
const myTv :Tv ={  
trunOn(){ 
  return true; 
},
trunOff(){
} 
}

function tryTurnOn(tv:Tv){
  tv.trunOn();
} 
tryTurnOn(myTv); 

interface SignUp{
  email:string;
  id:string;
  password:string;
};

function ajaxSignUp(data:SignUp){
}
ajaxSignUp({
  email
})


interface Cell{
  row:number;
  col:number;
  piece?:Piece;
  //piece?:Piece; piece는 optional (?)사용 선택 사항이다 
}  

interface Piece{
  move(from:Cell,to:Cell):boolean;
}

function createBoard(){
  const cells :Cell[]=[];
  for(let row=0;row<4;row++){
    for(let col=0;col<3;col++){
      cells.push({
        row,
        col
      })
    }
  }
  return cells;
}

const board =createBoard();
 board[0].piece ={
   move(from:Cell,to:Cell){
     return true;
   }
 }


 //변수 인터페이스 
interface Todo {
  id:number;
  content:string;
  completed:boolean;
}
let todos :Todo[] = [];

function addTodo(todo:Todo){
  todos = [...todos,todo];
}
const newTodo:Todo = {id:1,content:'HTML',completed:false};
addTodo(newTodo);
console.log(todos);

//함수 인터페이스 정의
interface SquareFunc{
  (num:number):number;
};

//함수 인터페이스를 구현하는 함수는 인터페이스를 준수해야한댜.
const squareFunc :SquareFunc = function (num:number){
  return num * num;
};
console.log(squareFunc(10)) //100;

//클래스 인터페이스
//인터페이스는 프로퍼티와 메소드를 가질수 있다는 점에서 클래스와 유사하나 직접 인스턴스를 생성할 수 없다.

interface ITodo{
  id:number;
  content:string;
  completed:boolean;
};
//Todo클래스는 ITodo인터페이스를 구현해야한다.
class Todo implements ITodo{
  constructor(
    public id :number,
    public content:string,
    public completed:boolean
  ){};
}
const todo = new Todo(1,'TypeScript',false);
console.log(todo);

//뿐만 아닌라 인터페이스의 메소드는 모두 추상 메소드이다. 
interface IPerson{
  name:string;
  sayHello():void;
};

class Person implements IPerson{
  //인터페이스에서 정의한 프로퍼티 구현
  constructor(public name:string){}
  //인터페이스에서 정의한 추상 메소드 구현
  sayHello(){
    console.log(`Hello ${this.name}`);
  }
};
function greeter(person:Person){
  person.sayHello();
};

const me = new Person('kim');
greeter(me); //Hello kim;

interface IDuck{
  quack():void;
};
class MallarDuck implements IDuck{
  quack(){
    console.log('QUAK!');
  }
}
class RedheadDuck {
  quack(){
    console.log('q~~ack');
  }
}
function makeNoise(duck:IDuck):void{
  duck.quack();
}
makeNoise(new MallarDuck());
makeNoise(new RedheadDuck())


interface IPerson{
  name:string;
};
function sayHello(person:IPerson):void{
  console.log(`Hello ${person.name}`);''
};
const me = {name:'kim',age:20};
sayHello(me);

interface Person{
  name:string;
  age?:number
};
interface Student extends Person{
  grade:number;
}
const student : Student = {
  name:'kim',
  age:20,
  grade:3
};

interface Person{
  name:string;
  age?:number;
}
interface Developer{
  skills:string[];
};
interface WebDeveloper extends Person,Developer{};

const webDeveloper :WebDeveloper = {
  name:'kim',
  age:20,
  skills:['html','cas','javascript']
};

class Person {
  constructor(
    public name:string,
    public age:number
  ){}
}
interface Developer extends Person{
  skills:string[];
}
const developer:Developer = {
  name:'kim',
  age:20,
  skills:['HTML','KIM']
}


