import * as action from './action';

import {ActionType} from 'typesafe-actions';
import { GithubProfile } from '../../api/github';
import { AsyncState } from '../../lib/reducerUtils';

export type GithubAction =ActionType<typeof action>;


//리듀서에서 관리할 상태의 타입
//성공했을때  GithunProfile 실패시 Error
// export type GithubState = {
//   userProfile:{
//     loading:boolean,
//     data:GithubProfile | null,
//     error:Error | null
//   }
// };
export type GithubState = {
  userProfile:{
    loading:boolean;
    data:GithubProfile | null;
    error:Error | null;
  }
};





//위 타입 유틸 함수 사용 위의 함수 한 줄 처리 가능
// 첫번째 제네릭에는 성공했을 때의 타입, 두번째는 실패했을때 Error 일때의 타입을 넣어줌
export type GithubState = {
  userProfile:AsyncState<GithubProfile,Error>
}

