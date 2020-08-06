import { getUserProfileAsync, GET_USER_PROFILE } from "./action";
import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserProfile, GithubProfile } from "../../api/github";
import CreateAsyncSaga from "../../lib/CreateAsyncSaga";

//action의 ReturnType 액션 생성함수을 통해 액션의 타입을 가져올수 있다
// function* getuserProfileSaga(action: ReturnType<typeof getUserProfileAsync.request>) {
//   try {
//     const userProfile: GithubProfile = yield call(getUserProfile, action.payload);
//     yield put(getUserProfileAsync.success(userProfile));
//   } catch (e) {
//     yield put(getUserProfileAsync.failure(e));
//   }
// }

//유틸함수를 사용한 saga함수
const getuserProfileSaga = CreateAsyncSaga(getUserProfileAsync,getUserProfile)

export function* githubSaga(){
  yield takeEvery(GET_USER_PROFILE,getuserProfileSaga);
}
