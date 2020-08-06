//any 타입은 생략해도 에러가 발생하지 않는다.
import {AsyncActionCreator, ActionType, getType } from 'typesafe-actions';
// import { AnyAction } from 'redux';

//E에 해당하는 타입이 선언되지않는다면 any타입으로 설정하겠다.
export type AsyncState<T, E = any> = {
  loading: boolean;
  data: T | null;
  error: E | null;
}
// const sample : AsyncState<number>={}

//유틸 함수가 들어있는 객체가 완성됨
export const asyncState = {
  //함수로 작성을 해줌
  initial: <T, E>(initialData?: T): AsyncState<T, E> => ({
    loading: false,
    data: initialData || null,
    error: null
  }),
  load: <T, E>(data?: T | null): AsyncState<T, E> => ({
    loading: true,
    data: data || null,
    error: null
  }),
  success: <T, E>(data: T): AsyncState<T, E> => ({
    data,
    loading: false,
    error: null
  }),
  error: <T, E>(error: E): AsyncState<T, E> => ({
    error,
    loading: false,
    data: null,
  })
};

// const state = {
//   a:1,
//   b:2,
//   c:3
// };
//  type key = keyof typeof state; //key= "a |b |c"가 됨

type AnyAsyncActionCreator = AsyncActionCreator<any, any, any>;

export function transformToArray<AC extends AnyAsyncActionCreator>(asyncActionCreator: AC) {
  const { request, success, failure } = asyncActionCreator;
  return [request, success, failure];
}

//K extends keyof S(상태) - K는 S(상태)의 키를 상속한다
//비동기 작업을 처리하는 리듀서를 대신 만들어 주는 함수를 생성
// 다음은 실재 reducer를 유틸 함수로 적용
export function createAsyncReducer<
  S, AC extends AnyAsyncActionCreator, K extends keyof S>(
    asyncActionCreator: AC,
    key: K) {
  //리듀서를 만들어서 반환해줌
  return (state: S, action: ActionType<AC>) => {
    // const [request, success, failure] = [
    //   asyncActionCreator.request,
    //   asyncActionCreator.success,
    //   asyncActionCreator.failure,
    // ].map(getType); //해당 액션 생성함수들의 타입을 생성한다 
    //userProfile이 [key]가 된다
    const [request, success, failure] = transformToArray(asyncActionCreator).map(getType);
    switch (action.type) {
      case request:
        return {
          ...state,
          [key]: asyncState.load()
        };
      case success:
        return {
          ...state,
          [key]: asyncState.success(action.payload)
        }
      case failure:
        return {
          ...state,
          [key]: asyncState.error(action.payload)
        }
      default:
        return state;
    }
  }
}
//getType을 사용하면 해당 액션의 타입을 추출 할 수 있게된다
    // const type = getType(asyncActionCreator.request())
