import * as action from './action';
import {ActionType} from 'typesafe-actions';
import { GithubProfile } from '../../api/github';

export type GithubAction =ActionType<typeof action>;

//리듀서에서 관리할 상태의 타입
export type GithubState = {
  userProfile:{
    loading:boolean,
    data:GithubProfile | null,
    error:Error | null
  }
};
