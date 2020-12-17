import { createStandardAction } from "typesafe-actions";

// 액션
export const ADD_TODO = 'todos/ADD_TODO'as const ;
export const TOGGLE_TODO = 'todos/TOGGLE_TODO';
export const REMOVE_TODO = 'todos./REMOVE_TODO';

let nextId = 1;
//액션 생성자 함수
export const addTodo  =(text:string)=>({
  type:ADD_TODO,
  payload:{
    id:nextId++,
    text
  }
});

export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();
export const removeTodo = createStandardAction(REMOVE_TODO)<number>();
