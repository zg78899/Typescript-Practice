import { createReducer, action } from 'typesafe-actions'
// import { GithubProfile } from '../../api/github';
import { GithubState, GithubAction } from './types';
import { GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR, getUserProfileAsync } from './action';
import { asyncState, createAsyncReducer, transformToArray } from '../../lib/reducerUtils';

// const initialState: GithubState = {
//   userProfile: {
//     loading: false,
//     error: null,
//     data: null
//   }
// };

const initialState: GithubState = {
  userProfile:asyncState.initial()
};


//thunk함수의 reudcer을 작성해 준다.
// const github = createReducer<GithubState,GithubAction>(initialState,{
//   [GET_USER_PROFILE]:state=>({
//     ...state,
//     userProfile:{
//       loading:true,
//       data:null,
//       error:null
//     }
//   }),
//   [GET_USER_PROFILE_SUCCESS]:(state,action)=>({
//     ...state,
//     userProfile:{
//       loading:false,
//       data:action.payload,
//       error:null
//     }
//   }),
//   [GET_USER_PROFILE_ERROR]:(state,action)=>({
//     ...state,
//     userProfile:{
//       loading:false,
//       data:null,
//       error:action.payload
//     }
//   })
// });

//CreateAync 유틸 함수를 사용한 리듀서
// const github = createReducer<GithubState,GithubAction>(initialState,{
//   [GET_USER_PROFILE]:state=>({
//     ...state,
//     userProfile:asyncState.load()
//   }),
//   [GET_USER_PROFILE_SUCCESS]:(state,action)=>({
//     ...state,
//     userProfile:asyncState.success(action.payload)
//   }),
//   [GET_USER_PROFILE_ERROR]:(state,action)=>({
//     ...state,
//     userProfile:asyncState.error(action.payload)
//   })
// });

const github = createReducer<GithubState, GithubAction>(initialState).handleAction(
  transformToArray(getUserProfileAsync),
  createAsyncReducer(getUserProfileAsync, 'userProfile')
);

  export default github;
