import React from 'react';
import GithubUsernameForm from '../components/github/GithubUsernameForm';
import GithubProfileinfo from '../components/github/GithubProfileInfo';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../modules/index';
import { getUserProfileThunk } from '../modules/github';



function GithubProfileLoader(){
  //비구조화 할당하여 상태를 가져와서 사용
  const {data,loading,error} = useSelector((state:RootState)=>state.github.userProfile);
  const dispatch = useDispatch();

  const onSubmitUsername  = (username:string) =>{
    dispatch(getUserProfileThunk(username));
  }


  return (
    <>
    <GithubUsernameForm onSubmitUsername={onSubmitUsername}/>
    {loading && <p style={{textAlign:"center"}}>로딩중...</p>}
    {error && <p style={{textAlign:"center"}}>에러발생</p>}
    {data && <GithubProfileinfo bio={data.bio} blog={data.html_url} name={data.name} thumbnail={data.avatar_url}/> }
    </>
  )
}
export default GithubProfileLoader;
