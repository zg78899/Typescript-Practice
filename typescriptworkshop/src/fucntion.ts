function add(x: number, y: number): number { // 파라미터의 타입을 명시 / add 함수가 반환하는 값을 number로 명시 할수도있다.
  return x + y;
}
const result = add(1, 2);//result는 number타입이다. 
//add(1,'2'); error;

function buildUserInfo(name?: string, email?: string) { //namerhk email을 매개변수로 받서 이를 키로 갖는 객체를 return 하는 함수이다.
  return { name, email };
}

// function buildUserInfo(name = "-",email ="-"){ //타입이 아닌 "-"으 기본값으로 설정을 해준다.
// // 그러면 함수를 호출할때 매개변수로 아무거솓 지정해주지않아도 "-"을 반환하게 된다.
//   return {name,email} //
// }
const user = buildUserInfo();// buildUserInfo함수에 매개변수로 아무것도 주지 않게 되면 기본값인 undefined을 가지게 된다. 

//화살표함수
const add2 = (a: number, b: number): number => a + b;

//함수의 오버로딩
interface Storage {// 두 타입을 구분하기 위한 임의 타입을 설정한것
  a: string;
}
interface ColdStorage {
  b: string;
}
//다음은 오버로드 시크니처 목록들이다.
//함수 시그니처 - 함수의 body가 없이 타입을 나타낸것
//함수의 오버로딩이란? - 이런 함수의 시그니처들을 같은 이름의 함수로 여러개를 사용하는 것을 의미한다. 
function store(type: '통조림'): Storage //매개변수의 타입에 문자열 "통조림"이 들어오면 interface Storage의 타입을 반환한다. 
function store(type: '아이스크림'): ColdStorage // 위와 동일

//실제 구현체를 작성해 주어야한다.
function store(type: "통조림" | "아이스크림") {// 유니온 타입
  if (type === "통조림") {
    return { a: "통도림" }
  } else if (type === "아이스크림") {
    return { b: "아이스크림" }
  }else{
    throw new Error('unsupported type');
  }
}

// const s = store("통조림") //s.a
const s = store("아이스크림"); //s.b
s.b
