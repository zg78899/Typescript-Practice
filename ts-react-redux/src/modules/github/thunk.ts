import { Dispatch } from "redux";
// import { ThunkAction } from 'redux-thunk';
// import { RootState } from "..";
// import { GithubAction } from "./types";
import { getUserProfileAsync } from "./action";
import { getUserProfile } from "../../api/github";


// export function getUserProfileThunk(username:string):ThunkAction<void,RootState,null,GithubAction>{
//   return async (dsipatch,getState)=>{
//   }
// }

//Thunk함수 작성 
export function getUserProfileThunk(username: string) {
  return async (dispatch: Dispatch) => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      const userProfile = await getUserProfile(username);
      dispatch(success(userProfile));
    } catch (e) {
      dispatch(failure(e));
    }
  }
}