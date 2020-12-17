import React, { useState, FormEvent } from 'react';
import { isFunctionTypeNode } from 'typescript';
type TodoInsertProps = {
  onInsert: (text: string) => void
}

function TodoInsert({ onInsert }: TodoInsertProps) {
  const [value, setValue] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onInsert(value);
    setValue('');
  }
  return (
     <form onSubmit={onSubmit}>
        <input  placeholder="할일을 입력하세요"
        value={value}
        onChange = {onChange}
        />
        <button type="submit">등록</button>
     </form>
)
}
export default TodoInsert;


type TodoInsertProps  = {
  onInsert:(text:string)=>void;
}
function TodoInsert({onInsert}:TodoInsertProps){
  const [value,setValue] = useState('');
  const onChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value);
  }
  const onSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    onInsert(value);
    setValue('');
  }
  return(
    <form onSubmit={onSubmit}>
      <input type="text" onChange={onChange} placeholder="할 일을 입력해 주세요"/>
      <button type="submit">등록</button>
    </form>
  )
}
export default TodoInsert;


