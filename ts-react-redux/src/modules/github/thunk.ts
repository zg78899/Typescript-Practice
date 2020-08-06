//typesafe-actions을 사용
// import { Dispatch } from "redux";
// import { ThunkAction } from 'redux-thunk';
// import { RootState } from "..";
// import { GithubAction } from "./types";
import { getUserProfileAsync } from "./action";
import { getUserProfile } from "../../api/github";
import createAsyncThunk from "../../lib/CreateAsyncThunk";


// export function getUserProfileThunk(username:string):ThunkAction<void,RootState,null,GithubAction>{
//   return async (dsipatch,getState)=>{
//   }
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

//위 코드의 thunk함수가 한줄로 끝이나 버림
export const getUserProfileThunk = createAsyncThunk(
  getUserProfileAsync,
  getUserProfile
  );

