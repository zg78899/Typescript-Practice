import axios from 'axios';

export async function getUserProfile(username:string){
 const response = await axios.get<GithubProfile>(`https://api.github.com/users/${username}`);
 return response.data;
 //axios.get의 타입을 설정해 주지않으면 return Promsie의 타입은 any이다.
 //그렇기에 return 타입을 제네릭으로 <GithubProfile>해준다. 
}



export type GithubProfile = {
  login:               string;
  id:                  number;
  node_id:             string;
  avatar_url:          string;
  gravatar_id:         string;
  url:                 string;
  html_url:            string;
  followers_url:       string;
  following_url:       string;
  gists_url:           string;
  starred_url:         string;
  subscriptions_url:   string;
  organizations_url:   string;
  repos_url:           string;
  events_url:          string;
  received_events_url: string;
  type:                string;
  site_admin:          boolean;
  name:                null;
  company:             null;
  blog:                string;
  location:            null;
  email:               null | string;
  hireable:            null;
  bio:                 null;
  twitter_username:    null;
  public_repos:        number;
  public_gists:        number;
  followers:           number;
  following:           number;
  created_at:          Date;
  updated_at:          Date;
}