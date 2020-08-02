import {createReducer, } from 'typesafe-actions';
import { TodoState, TodosAction, } from './types';
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actions';

//초기값
//initialState는 타입은 TodoState이고 []빈 배열이다.
const initialState : TodoState= [];

//리듀서
const todos = createReducer<TodoState,TodosAction>(initialState,{
  [ADD_TODO]:(state,action)=>state.concat({
    ...action.payload,
     done:false
  }),
  [TOGGLE_TODO]:(state,action)=>state.map(todo=>todo.id === action.payload ? {...todo,done:!todo.done}:todo),
  [REMOVE_TODO]:(state,action)=>state.filter(todo=>todo.id !== action.payload )
});

export default todos;
