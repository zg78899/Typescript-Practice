import React, { CSSProperties } from 'react';
import { Todo } from '../modules/todos';

type TodoItemProps ={
  todo:Todo;
  onToggle:(id:number) => void;
  onRemove:(id:number) => void;

}

//각 할일 정보에 대한 내용들을 보여줌

function TodoItem({todo,onToggle,onRemove}:TodoItemProps){
  
const handleTodo  = ()=>onToggle(todo.id);
 const handleRemove = ()=>onRemove(todo.id);


const textStyle:CSSProperties= {
  textDecoration:todo.done ? 'line-through':'none'
}
const removeStyle:CSSProperties = {
 color:'red',
 marginLeft:8
}
  
  return (
    <li>
      <span
      onClick={handleTodo}
      style={textStyle}
      >{todo.text}</span>
      <span 
      onClick={handleRemove}
      style={removeStyle}
      >(X)</span>
    </li>
  )
}
export default TodoItem;

