import { AsyncActionCreator } from 'typesafe-actions';
import {Dispatch} from 'redux';
//action에 createAsyncAction을 호출했을때의 결과가 AsyncActionCreator이다. 
import { getUserProfileAsync } from '../modules/github';


//type allias
//AnyAsyncActionCreator는 action 파일에 있는 getUserProfileAsync에 있는 값들이 액션 타입과 페이로드로 되어있는 부분을 모두 any 타입으로 설정겠다.
type AnyAsyncActionCreator = AsyncActionCreator<any, any, any>;
type AnyPromiseCreator = (...params:any[])=> Promise<any>;

//더 쉽게 Thunk 함수를 만들수 있는 유틸
export default function createAsyncThunk<
A extends AnyAsyncActionCreator,
F extends AnyPromiseCreator
>(asyncActionCreator:A,promiseCreator:F){
  //F라는 파라미터에 어떤 값을 넣어 주어야하는지를 나타냄
  type Params =Parameters<F>;
  return function thunk(...params:Params){
    return async (dispatch:Dispatch)=>{
      const {request,success,failure} = asyncActionCreator;
      //페이로드의 값을 undefinde을 넣어준다
      //액션 생성함수를 호출하여 dispatch 해줌
      dispatch(request(undefined));
      try{
        //api 호출 promiseCreator 사용
        const result  =await promiseCreator(...params);
        dispatch(success(result));
      }catch(e){
        dispatch(failure(e))
      }
    }
  }
};


// function sum(a:number,b:number){
//   return a+b;
// }
// type P = Parameters<typeof sum>;
//이렇게 되면 P는 2개의 number 타입을 가지는 배열이 됨

