//Type-guard and Type-assertion
//stringOrNull의  null을 제거해 준다
function f(stringOrNull:string | null):string{
  if(stringOrNull === null){
    return 'default';
  }else{
    return stringOrNull;
  }
};;

function f(stringOrNull:string | null):string{
  if(stringOrNull === null){
    return 'default';
  }else{
    return stringOrNull;
  }
}

function f(stringOrNull:string | null):string{
  return stringOrNull || 'default';
};

//만약에 컴파일러가 null또는 undefined을 제거하지 못할 경우 
//type assertion을 사용한다.
//선택자의 타입에 null과 undefined을 제거한다.

interface UserAccount {
  id:number;
  email?:string;
};

const user = getUser('admin');
user.id;//objcet id possibly undefined;

if(user){
  user.email.length;
  // objcet id possibly undefined;
}
user!.email!.length;
