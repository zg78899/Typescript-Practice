//인덱스 타입 - 일종의 자바스크립트의 객체나 map타입
interface Props {
  name:string;
  [key: string]: string; // 인덱스의 매개변수는 string 혹은 number만 와야한다.

}
//keyof연산자를 사용하면  User의 특정한 타입에 접근을 한다.

const keys:keyof Props; //key는 string또는 number가 된다.
interface User{
  name:string;
  age:number;
  hello(msg:string):void;
}
let keyOfUser: keyOF User;
keyOfUser = "age"// name age hello만 할당이 가능하다.

//특정 타입을 이름의 타입을 가져온다.
let helloMethod : User["hello"];
helloMethod = function(msg:string){
}

// const p: Props = {
//   name:'hihi'
//   a: 'd',
//   b: 'e',
//   c: '3',
//   0: 'd',
//   1: 'b'
// }
// p[3]
// p.name
// p.dfsf

interface Props {
  name:string;
  [key:string]:string;
};

const key:keyof Props;
interface User{
  name:string;
  age:number;
  hello(msg:string):void;
}
let keyOfUser :keyof User;
keyOfUser = "age";

let helloWorld :User("hello");
helloWorld = function (msg:string){
  
}