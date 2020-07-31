//Duck Pattern 
//액션 타입의 뒤에 as const을 붙이면 액션 생성함수가 type을 string이 아닌 값 그대로 인식한다.
const INCREASE  = 'counter/INCREASE'as const;
const DECREASE = 'counter/DECREASE'as const ;
const INCREASE_BY = 'counter/INCREASE_BY'as const;


export const increase  = ()=>({type:INCREASE});
export const decrease  = ()=>({type:DECREASE});
export const increaseBy = (diff:number)=>
({
  type:INCREASE_BY,
  payload:diff //액션의 모양을 통일화 한다. payload로 
});


//초기값의 타입 설정 
type CounterState ={
  count:number
}

//초기값 
const initialState:CounterState = {
  count:0
};

// action의 타입을 설정
type CounterAction = 
ReturnType<typeof increase> 
| ReturnType<typeof decrease>
| ReturnType<typeof increaseBy>

//리듀서 작성
function counter(state:CounterState = initialState,action:CounterAction):CounterState{
 switch(action.type){
   case INCREASE:
     return {
      count:state.count+1
     }
   case DECREASE:
     return {
       count:state.count-1
     }
    case INCREASE_BY:
      return {
        count:state.count + action.payload
      }   
   default:
    return state;
 }
}
export default counter;

