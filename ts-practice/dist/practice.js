"use strict";
let count = 0; //무조건 타입을 지정해 줄 필요는 없다.
count += 1;
// count = '문자열';
const message = 'hello world';
const done = false;
//배열을 다룰때
const number = [1, 2, 3, 4];
const messages = ['hihi', 'hello'];
//messages는 문자열로 이루어진 배열이기 때문에 
// messages.push(1);
//이 값은 문자열일수도 undefined일수도 있다.
let mgitBeUndefined = undefined;
let nullableNumber = null;
let color = 'red';
color = 'yellow';
// color = 'green';//에러가 발생하게 됨
function sum(x, y) {
    return x + y;
}
;
const result = sum(1, 2);
//배열의 안에 있는 모든 숫자 더하기
function sumArray(number) {
    return number.reduce((acc, current) => acc + current, 0);
}
const total = sumArray([1, 2, 3, 4, 5]);
console.log(total);
