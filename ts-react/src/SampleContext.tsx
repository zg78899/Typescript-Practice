import React, { createContext, Dispatch, useReducer, useContext } from 'react';

type FooValue = {
  foo: number,
};
//우리가 넣고 싶은 값 또는 null로 상태를 설정 함
const FooContext = createContext<FooValue | null>(null);

type Color = 'red' | 'orange' | 'yellow';
//상태에 대한 타입
type State = {
  count: number,
  text: string,
  color: Color,
  isGood: boolean
}
//액션의 타입
type Action =
  {
    type: 'SET_COUNT',
    count: number,
  } |
  {
    type: 'SET_TEXT',
    text: string
  } |
  {
    type: 'SET_COLOR', color: Color
  } |
  {
    type: 'TOGGLE_GOOD',
  }
//reducer함수에서는 반드시 return 리턴타입에 State을 반환해 주어야한다.
//reducer에서 중요한것은 파라미터의 타입 리턴 타입
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_COUNT':
      return {
        ...state,
        count: action.count + 1
      };
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text
      }
    case 'SET_COLOR':
      return {
        ...state,
        color: action.color
      }
    case 'TOGGLE_GOOD':
      return {
        ...state,
        isGood: !state.isGood
      }

    default:
      throw new Error(`unHandled action type`)
  }
}

type SampleDispatch = Dispatch<Action>;
//context을 만들어 줄것이다.
//우리는 context를 편하게 관리하기 위해서 상태를 관리하는 reducer와 dispatch르 관리하는 reudcer로 나누어 사용하겠다.
//1.상태만을 관리할 context
const SampleStateContext = createContext<State|null>(null);
//2. disaptch
const SampleDispatchContext = createContext< SampleDispatch | null>(null);

type SampleProviderProps = {
  children:React.ReactNode
}
//Provider 컴포너트를 만들겠다. 
export function SampleProvider({children}:SampleProviderProps){
 const [state,dispatch] = useReducer(reducer,{
   count:0,
   text:'hello',
   color:'red',
   isGood:true
 });
 return (
   <SampleStateContext.Provider value={state}>
     <SampleDispatchContext.Provider value={dispatch}>
      {children}
     </SampleDispatchContext.Provider>
   </SampleStateContext.Provider>
 )
}
//useSampleState는 리턴 값이 State 또는 nll이다.
//그렇기 때문에 결과가 항상 State 이기로 하기위해서 한줄의 코드입력
export function useSampleState(){
  const state = useContext(SampleStateContext);
  if(!state)  throw new Error(`Cannot find SampleProvider`);
 return state;
}
export function useSampleDispatch(){
  const dispatch =useContext(SampleDispatchContext);
 if(!dispatch) throw new Error(`Cannot find SampleProvider`);
  return dispatch;
}
