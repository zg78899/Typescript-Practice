//타입 스크립트는 자바스크립트의 7개의 타입을 가진다. 
 
let numValue :number;
let stringValue :string;
let booleanValue :boolean;
let undefinedValue :undefined;
let nullValue: null;
let objValue : object;
let symbolValue :symbol;
let anyVlue: any // 최상위 타입을 가진다.

//undefined, null은 모든 타입의 하위 타입이다.  

numValue = 3;
symbolValue =  Symbol();
{
  symbolValue:'hihi'
};

let nameList : string[];//nameList을 string[] 타입으로 설정해 주었지 때문에 
let nameList  : any[]; //타입으로 두면 문자열 또는 숫자 모두 가능
nameList = [1,3];//안됨
nameList =['1','2'];
nameList.push('1','2','3')//은 (문자열)은 되지만 수자 타입으로 안된다. 

let user1 :{ name :string , age: number} // 객체의  프로퍼에 대한 타입을 리터럴로 정의 /인라인 타입 이라고 부른다.
user1={
  name:'kim',
  age:27
}// 객체 리터럴을 통해 할당 해 줄수있다. 
// 설정해준 타입만이 가능하다. 
let user2 : { name :string , age: number}// 재사용되는 코드는 타입 얼라이언스 또는 인터페이스 등으로 정의하여 타입을 정의 
 
//튜플은 처음에 배열로 정의를하고 정의된 값만을 배열로 사용할 수있다. (타입과 배열의 갯수는 모두 선언과 동일해야한다.)
let tuple2 :[number,string];
let tuple3 :[number,number,number];
tuple2 = [1,'kim'];
tuple3 = [1,2,3]; 

//이외의 타입 never void enum 등이 존재한다. 
