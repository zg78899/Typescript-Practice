//교차 타입
function extend<First,Second>(first:First,second:Second):First & Second{
  const result :Partial<First & Second> ={};
  for(const prop in first){
    if(first.hasOwnProperty(prop)){
      (result as First)[prop] = first[prop];
    }
  }
  for(const prop in second){
    if(second.hasOwnProperty(prop)){
      (result as Second)[prop] = second[prop];
    }
  }
  return result as First & Second;
}
class Person{
  constructor(public name:string){}
};
interface Loggable{
  log(name:string):void
};
class ConsoleLogger implements Loggable{
  log(name){
    console.log(`Hello im ${name}`);
  }
};
const jim = extend(new Person('jim'),ConsoleLogger.prototype);
jim.log(jim.name);

// 유니온 타입

function padLeft(value:string,padding:any){
  if(typeof padding === 'number'){
    return Array(padding+1).join('')+value;
  }
  if(typeof padding === 'string'){
    return padding + value;
  }
  throw new Error(`Expected string or number ,got ${padding}`)
}
padLeft('Hello world ',4);
//위의 코드는 문제가 없지만 padding의 값을 any타입으로 설정으러 했기 때문에 문제가 있다. 
let indentString = padLeft('hello wolrd',true);
//코드는 컴파일 타임에 통과되고 ,런타임에 오류
//원시값을 전달하는 경우에는 any타입 말고 유니언 타입을 사용

function padLeft(value:string,padding:string |number){

}
let indentString = padLeft('Hello world',true) //런타임에러

//유니언에 있는 모든 타입에 공통인 멤버만 접근할 수 있다. 
interface Bird{
  fly();
  layEggs();
}

interface Fish{
  siwm();
  layEggs();
}
function getSmallPet():Fish | Bird{

}
let pet = getSmallPet();
pet.layEggs();// 성공
pet.swim() //오류

//type Guard and Differentiating Types

let pet = getSmallPet();

if(pet.swim){
  pet.swim();
}
else if(pet.fly){
  pet.fly();
}
//같은 코드를 동작하게 하려면 타입 단언을 사용해야한다.
let pet  = getSmallPet();
if((pet as Fish).siwm){
  (pet as Fish).siwm();
}else if((pet as Bird).fly){
  (pet as Bird).fly();
}


//타입 서술어 사용하기 - 타입가드를 사용하기 위해,반환 타입이 타입 서술어인 함수를 정의하면 된다.

function isFish(pet :Fish | Bird):pet is Fish{
  return (pet as Fish).swim !== undefined;
}

if(isFish(pet)){
  pet.siwm();
}else{
  pet.fly();
}
// TypeScript가 pet이 if문 안에서 Fish라는 것을 알고 있을뿐만 아니라;
// else문 안에서 Fish가 없다는 것을 알고 있으므로,
// Bird를 반드시 가지고 있어야합니다.
function move(pet:Fish | Bird){
  if('swim' in pet){
    return pet.swim();
  }
  return pet.fly();
}
//instanceof 타입가드

interface Padder{
  getPaddingString():string;
}
class SpaceRepeatingPadder implements Padder{
  constructor(private numSpace:number){}
  getPaddingString(){
    return Array(this.numSpace+1).join('');
  }
}
class StringPadder implements Padder{
  constructor(private value:string){}
  getPaddingString(){
    return this.value;
  }
}
function getRandomPadder(){
  return Math.random() < 0.5 ?
  new SpaceRepeatingPadder(4) : 
  new StringPadder(' ');
}
// 타입은 'SpaceRepeatingPadder | StringPadder' 입니다
let padder:Padder = getRandomPadder();

if(padder instanceof SpaceRepeatingPadder){
  padder;
}
if (padder instanceof StringPadder) {
  padder; // 타입은 'StringPadder'으로 좁혀집니다
}
