import React, { useState, useReducer } from 'react';

//useReducer을 사용한 상태 관리 방법
//Action에 타입을 모두 넣어준후에 사용
type Action = { type: 'INCREASE' } | { type: 'DECREASE' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      throw new Error(`Unhandled action type`)
  }
}
function Counter() {
  // const [count,setCount] = useReducer<number>(0)//generic으로 타입을 설정하지 않아도 useState을 통해서 값의 타입이 number이 라는 것을 유추할 수 있다. 
  const [count, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => dispatch({ type: "INCREASE" });
  const onDecrease = () => dispatch({ type: "DECREASE" });

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  )
}
export default Counter;


import React from 'react';

type Action = {type:'INCREASE'} | {type:'DECREASE'};

function reducer(state:number,action:Action):number{
switch(action.type){
  case 'INCREASE':
    return state+1;
  case 'DECREASE':
    return state-1;  
default:
  throw new Error(`unHandled action type`)
}
}

function Counter(){

  // const [count,setCount] = useState<number>(0)
  const [count,dispatch] = useReducer(reducer,0);

  const onIncrease = ()=> dispatch({type:'INCREASE'});
  const onDecrease = ()=> dispatch({type:'DECREASE'});

  // const onIncrease = ()=>dispatch(count+1);
  // const onDecrease =()=> setCount(()=>count+1);
  
  return(
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}
export default Counter;

