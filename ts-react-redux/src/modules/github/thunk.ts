//typesafe-actions을 사용
// import { Dispatch } from "redux";

import { ThunkAction } from 'redux-thunk';
import { RootState } from "..";
// import { GithubAction } from "./types";
import { getUserProfileAsync } from "./action";
import { getUserProfile } from "../../api/github";
import createAsyncThunk from "../../lib/CreateAsyncThunk";

//ThunkAction이 리턴하는 타입 - 1.void, 2.RootState, 3.Thunk.withExtraArgument 4.GithubAction
// export function getUserProfileThunk(username:string):ThunkAction<void,RootState,null,GithubAction>{
//   return async (dsipatch:Dispatch,getState:()=>RootState)=>{
//   }
// }

//Thynk 함수생성
// export function getUserProfileThunk(username:string){
//  return async (dispatch:Dispatch)=>{
//    const {request,success,failure} = getUserProfileAsync; // action 생성함수
//    dispatch(request());
//    try{
//     const userProfile = await getUserProfile(username);
//     dispatch(success(userProfile));

//    }catch(e){
//      dispatch(failure(e));
//    }
//  } 
// }

// //Thunk함수 작성 
// export function getUserProfileThunk(username: string) {
//   return async (dispatch: Dispatch) => {
//     const { request, success, failure } = getUserProfileAsync;
//     dispatch(request());
//     try {
//       const userProfile = await getUserProfile(username);
//       dispatch(success(userProfile));
//     } catch (e) {
//       dispatch(failure(e));
//     }
//   }
// }

//위 코드의 thunk함수가 유틸 함수로 인해 한줄로 끝이남
export const getUserProfileThunk = createAsyncThunk(
  getUserProfileAsync,
  getUserProfile
  );

