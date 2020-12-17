//Thunk함수를 만들어 줄것 이다.이때 필요한 것은 시작할 때 요청할 때 실패 했을때의 코드들

// import { createStandardAction } from "typesafe-actions/dist/deprecated/create-standard-action";
import {createAsyncAction, createStandardAction} from 'typesafe-actions'
import { GithubProfile } from "../../api/github";
import { AxiosError } from "axios";


//3가지 액션 타입  요청을 시작했을때, 성공했을때 ,실패했을 때
export const GET_USER_PROFILE = 'github/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS  = 'github/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR';



//액션 생성함수
//페이로드의 타입 제네릭으로 설정

// export const getUserProfile = createStandardAction(GET_USER_PROFILE)();
// export const getUserProfileSuccess = createStandardAction(GET_USER_PROFILE_SUCCESS)<GithubProfile>();
// export const getUserProfileError = createStandardAction(GET_USER_PROFILE_ERROR)<AxiosError>();

//createAsyncAction사용
//액션 생성함수 작성
export const getUserProfileAsync = createAsyncAction(
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
)<undefined,GithubProfile,AxiosError>(); //페이로드의 타입을 설정해 준다.
 //{request,success,failure};




//redux-saga에서는 GET_USER_PROFILE의 페이로드가 필요함
//어떠한 사용자 계정을 조회해야 할지 알아야하기 때문에 페이로드 string을 넣어줌
// export const getUserProfileAsync = createAsyncAction(
//   GET_USER_PROFILE,
//   GET_USER_PROFILE_SUCCESS,
//   GET_USER_PROFILE_ERROR,
// )<string,GithubProfile,AxiosError>(); //페이로드의 타입을 설정해 준다.

 