import { createReducer, action } from 'typesafe-actions'
// import { GithubProfile } from '../../api/github';
import { GithubState, GithubAction } from './types';
import { GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR, getUserProfileAsync } from './action';
import { asyncState, createAsyncReducer,transformToArray, transfromToArray} from '../../lib/reducerUtils';
import createAsyncThunk from '../../lib/CreateAsyncThunk';

// const initialState: GithubState = {
//   userProfile: {
//     loading: false,
//     error: null,
//     data: null
//   }
// };

// const initialState:GithubState = {
//   userProfile:{
//     loading:false,
//     data: null,
//     error:null
//   }
// }

// asyncState 유틸 함수를 사용한 초기값
const initialState: GithubState = {
  userProfile:asyncState.initial()
};

const github = createReducer<GithubState,GithubAction>(initialState,{
[GET_USER_PROFILE]:(state,action)=> ({
  ...state,
  userProfile:{
    loading:true,
    error:null,
    data:null
  }
}),
[GET_USER_PROFILE_SUCCESS]:(state,action)=>({
  ...state,
  userProfile:{
    loading:false,
    error:null,
    data:action.payload
  }
}),
[GET_USER_PROFILE_ERROR]:(state,action)=> ({
  ...state,
  userProfile:{
    loading:false,
    error:action.payload,
    data:null
  }
})
});

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

//asyncState 유틸 함수를 사용한 리듀서
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

//유킬 함수 적용
// const github = createReducer<GithubState, GithubAction>
// (initialState).handleAction(
//   [
//   getUserProfileAsync.request,
//   getUserProfileAsync.success,
//   getUserProfileAsync.failure
//   ],
//   createAsyncReducer(getUserProfileAsync,'userProfile')
// );

// 리팩토링 
// //createReducer의 handleAction을 사용하면 여러개의 액션을 하나의 reducer로 묶는것이 가능하다.
const github = createReducer<GithubState, GithubAction>
(initialState).handleAction(
  transformToArray(getUserProfileAsync),
  createAsyncReducer(getUserProfileAsync, 'userProfile')
);
export default github;
