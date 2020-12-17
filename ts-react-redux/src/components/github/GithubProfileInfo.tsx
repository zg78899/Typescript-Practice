import React from 'react';
import './GithubProfileinfo.css';

type GithubProfileProps = {
  name: string | null,
  thumbnail: string,
  bio: string | null,
  blog: string
};

function GithubProfileinfo({ name, thumbnail, bio, blog }: GithubProfileProps) {
  return (
    <div className="GithubProfileinfo">
      <div className="profile-head">
        <img src={thumbnail} alt="user thumbnail" />
        <div className="name">{name === null ? <p>입력한 이름이 없습니다.</p> : name}</div>
      </div>
      <p>{bio === null ? <p>기록된 내용이 없습니다.</p> : bio}</p>
      <div>{blog !== '' && <a href={blog}>{blog}</a>}</div>
    </div>
  )
}

export default GithubProfileinfo;

import React from 'react';

