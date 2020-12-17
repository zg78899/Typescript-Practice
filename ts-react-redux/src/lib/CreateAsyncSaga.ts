//sagar함수를 간단하게 만드는 유틸함수

import { AsyncActionCreator, PayloadAction } from "typesafe-actions";
import { call, put } from "redux-saga/effects";
import { getUserProfile } from "../api/github";

//P는 파라미터의 타입을 의미,T는 promiseCreator가 반환하는 타입을 의미한다
//payload을 파라미터로 받고 Promise을 결과 타입을 T로 반환한다
type PromiseCreatorFunction<P, T> =
  ((payload: P) => Promise<T>) | (() => Promise<T>);

//type -guard 문법을 사용
function isPayloadAction(action: any): action is PayloadAction<string, any> {
  return action.payload !== undefined
}

//6개의 제네릭을 가져옴
export default function CreateAsyncSaga<T1, P1, T2, P2, T3, P3>(
  asyncActionCreator: AsyncActionCreator<[T1, P1], [T2, P2], [T3, P3]>,
  promiseCreator: PromiseCreatorFunction<P1, P2>) {
  return function* saga(action: ReturnType<typeof asyncActionCreator.request>) {
    try {
      //actino이 있냐 없냐에 따라서 문제가 발생할 수 있다. 
      // const result: P2 = yield call(promiseCreator, action.payload);
      const result: P2 = isPayloadAction(action) ?
        yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);

      yield put(asyncActionCreator.success(result));

    } catch (e) {

      yield put(asyncActionCreator.failure(e))
    }
  }
}

import {AsynnActionCreator,PayloadAction} from 'typesafe-actions';

//P PromiseCreator을 호출할때 사용하는 파라미터
//T Promise의 결과 타입
type PromiseCreatorFunction<P,T> =
 ((paylaod:P)=>Promise<T>) 
| (()=>Promise<T>);

//타입 가드
function isPayloadAction(action:any):action is PayloadAction<string,any>{
//액션 페이로드가 undefined이 아니라면 
// 파라미터로 받아온 action은 PayloadAction 타입이다
//PayloadAction의 액션타입은 string이고 페이로드는 any이다.
  return action.payload !== undefined;
}

export function createAsyncSaga<T1,P1,T2,P2,T3,P3>
(asyncActionCreator:AsyncActionCreator<[T1,P1],[T2,P2],[T3,P3]>,
  promiseCreator:PromiseCreatorFunction<P1,P2>){

    //saga함수리턴 해줌
    return function* saga(action:ReturnType<typeof asyncActionCreator.request>){
      try{
        // const result:P2 = yield call(promiseCreator,action.payload);
        const result:P2 = isPayloadAction(action) ? //true  action의 paylaod가 있다면
        yield call(promiseCreator,action.payload) : yield call(promiseCreator);

        yield put(asyncActionCreator.success(result));
      }catch(e){
        yield put(asyncActionCreator.failure(e))
      }
    }
}