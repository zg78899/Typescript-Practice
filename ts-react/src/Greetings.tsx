import React from 'react';

type GreetingProps = {
  name: string,
  // chidlren?:React.ReactNode  다로 선언을 안해줘도 props로 사용할 수 있다. 
  mark: string,
  optional?: string,
  onClick:(name:string)=>void
  
  
  
}
//따로 children이라고 설정을 안해줘도 된다.
//const Greetings = React.Fc<GreetingProps>({name,mark,optional,onClcik,children})=>{} 
//위 방식의 장점은 props에 children을 그대로 사용할 수 있다는 것
//반면에 function 키워드로 설정을 하면 초기에 children이 없기 때문에 type이나 interface로 설정을 해주어야한다 
function Greetings({ name, mark, optional ,onClick}: GreetingProps) {
  //array는 array 또는 undefined이기 때문에 바로 array.map같은 함수를 사용 못함
  //array:string[]
  // if(!array)return null;
  // array.map //이런 식으로 코딩을 해야한다.
const handleClick = () =>onClick(name)



  return (
    <div>
      Hello,{name}{mark}
      {optional && <p>{optional}</p>}
      <div>
        <button onClick = {handleClick}>Click me</button>
      </div>
    </div>
  )
};

//React.Fc 를 사용할 때 defaultProps가 제대로 작동하지 않지만 
//funcitonal로 작성한 경우에는 defaultProps가 작동한다. 
//defaultProps을 설정해 주면 props로 내려주지않아도 될것 같지만 
//defaultProps가 적용이 되지 않는다.
Greetings.defaultProps = {
  mark: '!',
  // array:['a','b','c']
};

export default Greetings;