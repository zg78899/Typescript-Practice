//intersaction 타입 &을 사용하여 만든다.
interface User {
  name: string;
}
interface Action {
  do(): void;
};

function createUserAction(u: User, a: Action): User & Action {
  return { ...u, ...a } // 스프레드 사용, 두 타입을 합쳐서 반환
}
const u = createUserAction({ name: 'jay' }, { do() { } });

//함수 오버로딩을 통해서 함수를 정의하면 number와 string을 엇갈려  사용할수없다.
function compare(x:string,y:string)
function compare(x:number,y:number);

 
//union타입 | 을 사용하는 방법 /union타입을 사용할때는 꼭 타입 가드를 사용해야한다. 
function compare(x: string | number, y: string | number) {
  if (typeof x === 'number' && typeof y === 'number') {
    return x === y ? 0 : x > y ? 1 : -1;
  }
  if(typeof x === 'string' && typeof y === 'string'){
    return x.localeCompare(y);
  }
  throw new Error('not supported type');
}
const v = compare("a",2); //타입을 엇갈려 사용하면 런타임 에러를 발생하게된다.
console.log([3,2,1].sort(compare)) //number;
console.log(["c","b","a"].sort(compare)) //string;


function isAction(v:User | Action): v is Action{//타입가드 설정
return (<Action>v).do !== undefined; //v라는 값의 속성에 do가 있으면 Action이라고 본다.
}

function process(v:User | Action){
  // if((<Action>v).do){// 타입 Assertion
  //   (<Action>v).do()
  // }
  if(isAction(v)){//Action일때 
    v.do();
  }else{ //User일때 
    console.log(v.name) //v는 union이기 대문에 User라는 것을 알수있게 된다.
  }
}
