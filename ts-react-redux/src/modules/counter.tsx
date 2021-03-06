//typesafe - action
//최신 버전의 typsscript에서 createStandardAction은 deprecated됨
// typescript의 버전을 하향 시키거나 다음과 같은 코드르 삽입해줌
import { action, ActionType, createReducer, createStandardAction } from 'typesafe-actions';
import Counter from '../components/Counter';


//Duck Pattern 
//액션 타입의 뒤에 as const을 붙이면 액션 생성함수가 type을 string이 아닌 값 그대로 인식한다.
// const INCREASE  = 'counter/INCREASE'as const;
// const DECREASE = 'counter/DECREASE'as const ;
// const INCREASE_BY = 'counter/INCREASE_BY'as const;

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';


// export const increase  = ()=>({type:INCREASE});
// export const decrease  = ()=>({type:DECREASE});
// export const increaseBy = (diff:number)=>
// ({
//   type:INCREASE_BY,
//   payload:diff //액션의 모양을 통일화 한다. payload로 
// });

// export const increase  = createStandardAction(INCREASE)();
// export const decrease  = createStandardAction(DECREASE)();
// //createStandardAction은 경우에는 만약에 payload의 값이 있을경우 return타입을 제네릭으로 나타낸다.
// export const increaseBy = createStandardAction(INCREASE_BY)<number>();

//createReducer의 메소드 체이닝 방식을 사용하면 다음과 같이 액션 타입을 따로 설정 해주지 않아도 된다.
export const increase  = createStandardAction(INCREASE)();
export const decrease  = createStandardAction(DECREASE)();
//createStandardAction은 경우에는 만약에 payload의 값이 있을경우 return타입을 제네릭으로 나타낸다.
export const increaseBy = createStandardAction(INCREASE_BY)<number>();



//초기값의 타입 설정 
type CounterState ={
  count:number
}

//초기값 
const initialState:CounterState = {
  count:0
};

// action의 타입을 설정
// type CounterAction = 
// ReturnType<typeof increase> 
// | ReturnType<typeof decrease>
// | ReturnType<typeof increaseBy>

//typesafe- action을 사용할 때  ActionType을 이용함
//createReducer의 메소드 체이닝 망식을 사용할 때 굳이 필요가 없어진다.
const actions ={ increase,decrease,increaseBy};
type CounterAction = ActionType<typeof actions>



//1.리듀서 작성(object map 형식의 리듀서)
//stypesafe -action을 이용한 리튜서 만들기 
// createReducer에 제네릭으로 state의 타입과 action의 타입을 설정 해준다.
const counter  = createReducer<CounterState,CounterAction>(initialState,{
  [INCREASE]:(state)=>({count:state.count+1}),
  [DECREASE]:(state)=>({count:state.count-1}),
  [INCREASE_BY]:(state,action)=>({count:state.count+action.payload})
});



//2.리듀서 작성( 메소드 체인닝) - 액션의 타입을 따로 선언해 주는 것을 생략해도 된다.
 //handleAction의 첫번째 파라미터에 액션 생성함수를 넣어 주면 액샨 타입을 따로 생략해 주어도된다.
 //다음과 같이 액션 타입을 생략하게 되면 redux-saga나 thunk같은 미들웨어를 사용할때 다음의 구조는 적합하지 않을 수 있다.
 // 그때는 getType을 사용하

// const counter = createReducer<CounterState,CounterAction>(initialState)
// .handleAction(INCREASE, (state) =>({count:state.count+1}))
// .handleAction(DECREASE, state =>({count:state.count-1}))
// .handleAction(INCREASE_BY, (state,action)=>({count:state.count+action.payload}))

//액션 생성함수 , 액션 타입을 생략한, CounterAction 정의할 필요없음
// const increase = createStandardAction('counter/INCERASE');
// const decrease = createStandardAction('counter/DECREASE');
// const increaseBy = createStandardAction('counter/INCREASE_BY')<number>();
// 이후 액션 타입을 제거가능

// const counter = createReducer<CounterState>(initialState)
// .handleAction(increase,(state)=> ({count:state.count+1}))
// .handleAction(decrease,(state)=>({count:state.count-1}))
// .handleAction(increaseBy,(state)=>({count:state.count+action.payload}))

//리듀서 작성 
// function counter(
//   state:CounterState = initialState,
//   action:CounterAction):CounterState{
//  switch(action.type){
//    case INCREASE:
//      return {
//       count:state.count+1
//      }
//    case DECREASE:
//      return {
//        count:state.count-1
//      }
//     case INCREASE_BY:
//       return {
//         count:state.count + action.payload
//       }   
//    default:
//     return state;
//  }
// }
export default counter;

//액션
const INCREASE  = 'counter/INCREASE'as const; //as const thrtjd rmeofh
const DECREASE = 'counter/DECREASE'as const ;
const INCREASE_BY = 'counter/INCREASE_BY'as const;
//애션 생성함수
const increase = ()=> ({type:INCREASE});
const decrease =()=>({type:DECREASE});
const increaseBy = (diff:number)=> ({type:INCREASE_BY,payload:diff});

type CounterState ={
  count:number;
}
//initialState 객체 타입 리듀서에서 reutrn 할때도  객체 타입에서 reutrn 해준다.
const initialState:CounterState = 
{
  count:0 
};

//action의 타입을 {type:'counter/INCREASE'}이런 식으로 직접 적어주는것 또는 {type:typeof incerase}
//이런 식으로 정의하는것이 아니라 ReturnType<type: typeof increase>  함수의 결과물을 그대로 가져올수 있다.
type CounterAction = ReturnType<typeof increase > | ReturnType<typeof decrease> | ReturnType<typeof increaseBy>;

//리듀서
function counter(state:CounterState,action:CounterAction):CounterState{
  switch(action.type){
    case INCREASE:
      return {
        count:state.count+1
      }
    case DECREASE:
      return{
        count:state.count-1
      }
    case INCREASE_BY:
      return {
        count:state.count+action.payload
      }
    default:
      throw new Error(`UnHandled type Error`);
  }
}

export default counter; //ducks pattern을 사용한 리듀서 

