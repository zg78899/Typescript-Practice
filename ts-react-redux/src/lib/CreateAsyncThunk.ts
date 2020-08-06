import { AsyncActionCreator } from 'typesafe-actions';
import {Dispatch} from 'redux';
//action에 createAsyncAction을 호출했을때의 결과가 AsyncActionCreator이다. 

import { getUserProfileAsync } from '../modules/github';


//type allias
type AnyAsyncActionCreator = AsyncActionCreator<any, any, any>;
type AnyPromiseCreator = (...params:any[])=> Promise<any>;

export default function createAsyncThunk<
A extends AnyAsyncActionCreator,
F extends AnyPromiseCreator
>(asyncActionCreator:A,promiseCreator:F){
  //F라는 파라미터에 어떤 값을 넣어 주어야하는지를 나타냄
  type Params =Parameters<F>;
  return function thunk(...params:Params){
    return async (dispatch:Dispatch)=>{
      const {request,success,failure} = getUserProfileAsync;
      //페이로드의 값을 undefinde을 넣어준다
      dispatch(request());
      try{
        const result  =await promiseCreator(...params);
        dispatch(success(result
          ));
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
//이렇게 되면 P라는 타입은 2개의 number 타입을 가지는 타입이다.

