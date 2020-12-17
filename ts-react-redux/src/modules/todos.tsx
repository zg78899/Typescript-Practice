const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

let nextId = 1;
export const addTodo = (text:string) =>({type:ADD_TODO,
    payload:{
    id:nextId++,
    text
  }});

export const toggleTodo = (id:number)=>({
  type:TOGGLE_TODO,
  payload:id
});

export const removeTodo = (id:number)=>({
  type:REMOVE_TODO,
  payload:id
});
//액션 타입
type TodoAction = 
ReturnType<typeof addTodo> 
| ReturnType<typeof toggleTodo> 
| ReturnType<typeof removeTodo>;

 export type Todo = {
   id:number,
   text:string;
   done:boolean;
 }

 type TodoState = Todo[];
 

//initialState는 type TodoState의 빈 배열이다. 
 const initialState: TodoState = [];



 function todos(state:TodoState = initialState,action:TodoAction):TodoState{
 switch(action.type){
   case ADD_TODO:
     return state.concat({
       id:action.payload.id,
       text:action.payload.text,
       done:false
     });
   case TOGGLE_TODO:
     return state.map(todo=> todo.id === action.payload ? {...todo,done:!todo.done}:todo)  
   case REMOVE_TODO:
     return state.filter(todo=> todo.id !== action.payload) //일치 한다면 사라짐
   default:
     throw new Error(`Unahandled type Error`);
 }

 }
 export default todos;


import {createStandardAction,createReducer,createAction,ActionType} from 'typesafe-actions';

 const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const REMOVE_TODO = 'todos/REMOVE_TODO';

let nextId = 1;
export const addTodo = (text:string) =>({type:ADD_TODO,
    payload:{
    id:nextId++,
    text
  }});
  //createAction
// export const addTodo = createAction(ADD_TODO,action=>(text:string)=>action({
//   id:nextId ++;
//   text
// }))

export const toggleTodo = (id:number)=>({
  type:TOGGLE_TODO,
  payload:id
});
export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();

export const removeTodo = (id:number)=>({
  type:REMOVE_TODO,
  payload:id
});
export const removeTodo = createStandardAction(REMOVE_TODO)<number>();

//액션 타입

// type TodoAction = 
// ReturnType<typeof addTodo> 
// | ReturnType<typeof toggleTodo> 
// | ReturnType<typeof removeTodo>;

//typesafe-actions사용
const actions = {addTodo,toggleTodo,removeTodo};
type TodoAction = ActionType<typeof actions>

 export type Todo = {
   id:number,
   text:string;
   done:boolean;
 }

 type TodoState = Todo[];
 

//initialState는 type TodoState의 빈 배열이다. 
 const initialState: TodoState = [];

 //typesafe-actinos을 사용한 todos리듀서 생성
 
 const todos = createReducer<TodoState,TodoAction>(initialState,{
  [ADD_TODO]:(state,action)=>state.concat({
    ...action.payload,
    done:false
  }),
  [TOGGLE_TOOD]:(state,action) =>state.map(todo=>todo.id === action.payload ? {...todo,done:!todo.done}:todo),
  [REMOVE_TODO]:(state,action) =>state.filter(todo=> todo.id !== action.payload)

 })

//  function todos(state:TodoState = initialState,action:TodoAction):TodoState{
//  switch(action.type){
//    case ADD_TODO:
//      return state.concat({
//        id:action.payload.id,
//        text:action.payload.text,
//        done:false
//      });
//    case TOGGLE_TODO:
//      return state.map(todo=> todo.id === action.payload ? {...todo,done:!todo.done}:todo)  
//    case REMOVE_TODO:
//      return state.filter(todo=> todo.id !== action.payload) //일치 한다면 사라짐
//    default:
//      throw new Error(`Unahandled type Error`);
//   }
//  }


 export default todos;


