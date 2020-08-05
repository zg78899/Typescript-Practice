import { createReducer } from 'typesafe-actions'
// import { GithubProfile } from '../../api/github';
import { GithubState, GithubAction } from './types';
import { GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR } from './action';

const initialState: GithubState = {
  userProfile: {
    loading: false,
    error: null,
    data: null
  }
};

//thunk함수의 reudcer을 작성해 준다.
const github = createReducer<GithubState,GithubAction>(initialState,{
  [GET_USER_PROFILE]:state=>({
    ...state,
    userProfile:{
      loading:true,
      data:null,
      error:null
    }
  }),
  [GET_USER_PROFILE_SUCCESS]:(state,action)=>({
    ...state,
    userProfile:{
      loading:false,
      data:action.payload,
      error:null
    }
  }),
  [GET_USER_PROFILE_ERROR]:(state,action)=>({
    ...state,
    userProfile:{
      loading:false,
      data:null,
      error:action.payload
    }
  })
});

export default github;

