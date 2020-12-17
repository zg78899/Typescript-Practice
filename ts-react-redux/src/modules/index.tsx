import {combineReducers} from 'redux';
import counter from './counter';
import todos from './todos';
import github,{githubSaga} from './github';
import {all } from 'redux-saga/effects';


const rootReducer = combineReducers({
  counter,
  todos,
  github
});

export default rootReducer;
//rootReducer에서 내보내는 함수의 리턴 타입을 설정해줌
export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga(){
  yield all([githubSaga()]);
}



// import {combineReducer} from 'redux';

// import rootReducer = combineReducers({
//   counter,
//   todos
// })
// export default rootReducer;
// // rootReducer 함수에서 만든 리턴 타입을 반환해준다.
// export type RootState = ReturnType<typeof rootReducer>;