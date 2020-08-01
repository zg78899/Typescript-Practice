//인터페이스
interface Shape{
  getArea():number; //리턴 타입은 number이다.
//implements는 구현하겠다. 
}
class Circle implements Shape{
  // radius:number;

  constructor(public radius:number){
    this.radius = radius;
  }

  getArea(){
    return this.radius * this.radius * Math.PI;
  }
}

class Rectangle implements Shape{
  // width:number;
  // height:number;
  constructor(private width:number,private height:number){
    this.width = width;
    this.height = height;
  }
  getArea(){
    return this.width * this.height;
  }
}

const circle:Circle = new Circle(5);
circle.radius = 5;

const rectangle:Rectangle  = new Rectangle(10,20);


const shapes :Shape[] = [circle,rectangle];

shapes.forEach(shape=>{
  console.log(shape.getArea());
})
// function getCircleArea(circle:Circle){
//   return circle.getArea();
// }

interface Person{
  name:string,
  age ?:number; // age 값이 있을 수도 없을 수도 있다. 
};
interface Developer extends Person {
  skills:string[]
 };
 
const person:Person = {
  name:'rlawogjs',
  age:20,
};

const expert:Developer ={
  name:'김재헌',
  age:20,
  skills:['javascript']
}

//typeAliase //위의 인터페이스와 동일한 결과
 type Person = {
   name:string,
   age?:number
 };
 type Developer = Person &{ //타입을 상속하겠다.
  skills:string[]
 };
 const person :Person  = {
   name:'김개발',
   age:20
 };
 const expert :Developer = {
   name:'김개발',
   skills:['JAVASCRIPT']
 };

 type People = Person[];
 const people:People = [person,expert];

 type Color  = 'red'| 'orange' |'yellow';
 const color:Color  = 'red';
