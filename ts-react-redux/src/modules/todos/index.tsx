// import { deprecated,
//    ActionType,
//     createReducer,
//      action } from 'typesafe-actions';
// const { createAction, createStandardAction } = deprecated;

//typesafe Action 라이브러리를 사용하면 액션 타입,액션 생성함수,리듀서를 더욱 편리하게 사용할 수 있다. 
//액션 타입
// const ADD_TODO = 'todos/ADD_TODO'as const;
// const TOGGLE_TODO = 'todos/TOGGLE_TODO'as const;
// const REMOVE_TODO = 'todos./REMOVE_TODO'as const;

//createAction을 사용하지 않는 경우에는 타입 뒤에 as const을 꼭 붙여준다.
// const ADD_TODO = 'todos/ADD_TODO'as const ;
// const TOGGLE_TODO = 'todos/TOGGLE_TODO';
// const REMOVE_TODO = 'todos./REMOVE_TODO';

//유니크 아이디로 사용할 변수 
// let nextId = 1;

//액션 생성함수
// export const addTodo = (text: string) => ({
//   type: ADD_TODO,
//   payload: {
//     id: nextId++,
//     text
//   }
// });
// export const toggleTodo = (id: number) => ({
//   type: TOGGLE_TODO,
//   payload: id
// });
// export const removeTodo = (id: number) => ({
//   type: REMOVE_TODO,
//   payload: id
// });

//createsStandard가 아닌 createAction을 사용한다 이유는 payload의 값이 파라미터로 받아오는 값이 아니기때문(nextId)
// export const addTodo = createAction(ADD_TODO,action=>(text:string)=>
// action({
//   payload:{
//     id:nextId++,
//     text
//   }
// }));

//변경된 액셩 생성함수들
// export const addTodo  =(text:string)=>({
//   type:ADD_TODO,
//   payload:{
//     id:nextId++,
//     text
//   }
// });
// export const addTodo  = (text:string)=>action(ADD_TODO,{id:nextId++,text});

//createAction을 사용하지 않고 action만을 사용한 경우
// export const addTodo  = (text:string)=>action(ADD_TODO,{id:nextId++,text});
//payload의 reutrn 타입을 제네릭으로 반환해 준다.

// export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();
// export const removeTodo =createStandardAction(REMOVE_TODO)<number>();


//Action 타입을 설정
// type TodoAction =
//   ReturnType<typeof addTodo> |
//   ReturnType<typeof toggleTodo> |
//   ReturnType<typeof removeTodo>;

// const actions = {
//   addTodo,
//   toggleTodo,
//   removeTodo
// };

// type TodoAction = ActionType<typeof actions>;

//   //각 각 Todo 대한 타입 설정
// export type Todo = {
//   id: number,
//   text: string,
//   done: boolean
// }
// type TodoState = Todo[];

//초기값은 비어있는 상태이다. 
// const initialState: TodoState = [];

//todos 리듀서를 생성()
//  const todos = createReducer<TodoState,TodoAction>(initialState,{
//    [ADD_TODO]:(state,action)=> state.concat({...action.payload,done:false}),
//    [TOGGLE_TODO]:(state,action)=>state.map(todo=>todo.id === action.payload ? {...todo,done:!todo.done}:todo),
//    [REMOVE_TODO]:(state,action)=>state.filter(todo=>todo.id !== action.payload)
//  });
 
// function todos(state: TodoState = initialState, action: TodoAction): TodoState {
//   switch (action.type) {
//     case ADD_TODO:
//       return state.concat({
//         id: action.payload.id,
//         text: action.payload.text,
//         done: false
//       });
//     case TOGGLE_TODO:
//       return state.map(todo => todo.id === action.payload ? { ...todo, done: !todo.done } : todo);
//     case REMOVE_TODO:
//       return state.filter(todo => todo.id !== action.payload);// 일치 하면 제거
//     default:
//       return state;
//   }
// }
// export default todos;

//reducer파일에 있는 것을 그대로 가져와서 사용하겠다는 의미
export {default} from './reducer';
export * from './actions';//actions 파일에 있는 모든 것들을 불러와서 내보내겠다.
export * from './types';
//만약의 경우 action의 개수가 계속 증가하거나 많아 진다면
//다음과 같이 파일을 쪼개서 관리하는 것이 복잡성을 줄여준다.
