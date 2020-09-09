let count = 0; //무조건 타입을 지정해 줄 필요는 없다.
count += 1;
// count = '문자열';

const message: string = 'hello world';
const done: boolean = false;
//배열을 다룰때
const number: number[] = [1, 2, 3, 4]
  ;
const messages: string[] = ['hihi', 'hello'];
//messages는 문자열로 이루어진 배열이기 때문에 
// messages.push(1);

//이 값은 문자열일수도 undefined일수도 있다.
let mgitBeUndefined: string | undefined = undefined;

let nullableNumber: number | null = null;

let color: 'red' | 'yellow' = 'red';
color = 'yellow';
// color = 'green';//에러가 발생하게 됨


function sum(x: number, y: number): number { //결과물도 숫자로 반환한다. 
  return x + y;
};
const result = sum(1, 2);

//배열의 안에 있는 모든 숫자 더하기
function sumArray(number: number[]): number {
  return number.reduce((acc, current) => acc + current, 0);
}
const total = sumArray([1, 2, 3, 4, 5]);
console.log(total);

function returnNothing(): string | number {
  console.log('어쩌고 저쩌고');
  return 'asdasd';
  // return 12314
}
returnNothing(); //함수의 리턴 타입을 설정해 주지 않으면 void 타입을 가지게 된다.


