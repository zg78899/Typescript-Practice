import React, { useState, FormEvent, ChangeEvent } from 'react';
import './GithubUsernameForm.css';


type GithubUsernameFormProps = {
  onSubmitUsername: (username: string) => void;
}
function GithubUsernameForm({ onSubmitUsername }: GithubUsernameFormProps) {
  const [input, setInput] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitUsername(input);
    setInput('');
  }

  return (
    <form className="GithubUsernameForm" onSubmit={onSubmit}>
      <input placeholder="Github 계정명을 입력하세요" onChange={onChange} value={input} />
      <button type="submit">조회</button>
    </form>
  )
}
export default GithubUsernameForm;
