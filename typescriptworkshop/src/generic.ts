//generic  함수에서 파라미터르르 정의하듯이 파라미터의 타입을 정의할수있다. 
function createPromise<T>(x: T, timeout: number) {
  return new Promise<T>((resolve, reject) => { // 타입 파라미터
    setTimeout(() => {
      resolve(x);
    }, timeout);
  })
} //x의 타입을 T로 나타낸다.타입변수를 제네릭으로 <>

createPromise(10, 100)
  .then(v => console.log(v))

function createTuple2<T, U>(v: T, v2: U): [T, U] { // 여러개의 타입을 파라미터화 할수있다. 제네릭을 활용하여
  return [v, v2];
}
function createTuple3<T, U, D>(v: T, v2: U, v3: D): [T, U, D] {
  return [v, v2, v3];
}
const t1 = createTuple2("user", 1000);
t1[1].// 은 number의 타입이
  t[0].//은 string의 타입이들이 들어가있는 것을 확인할 수 있다. 