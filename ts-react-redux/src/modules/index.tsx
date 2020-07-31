import {combineReducers} from 'redux';
import counter from './counter';

const rootReducer = combineReducers({
  counter
});

export default rootReducer;
//rootReducer에서 내보내는 함수의 리턴 타입을 설정해줌
export type RootState = ReturnType<typeof rootReducer>

