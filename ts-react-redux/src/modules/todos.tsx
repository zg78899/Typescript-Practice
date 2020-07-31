//액션 타입
const ADD_TODO = 'todos/ADD_TODO'as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO'as const;
const REMOVE_TODO = 'todos./REMOVE_TODO'as const;
//유니크 아이디로 사용할 변수 
let nextId = 1;

//액션 생성함수
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    id: nextId++,
    text
  }
});
export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id
});
export const removeTodo = (id: number) => ({
  type: REMOVE_TODO,
  payload: id
});
//Action 타입을 설정
type TodoAction =
  ReturnType<typeof addTodo> |
  ReturnType<typeof toggleTodo> |
  ReturnType<typeof removeTodo>;

  //각 각 Todo 대한 타입 설정
export type Todo = {
  id: number,
  text: string,
  done: boolean
}
type TodoState = Todo[];

//초기값은 비어있는 상태이다. 
const initialState: TodoState = [];

function todos(state: TodoState = initialState, action: TodoAction): TodoState {
  switch (action.type) {
    case ADD_TODO:
      return state.concat({
        id: action.payload.id,
        text: action.payload.text,
        done: false
      });
    case TOGGLE_TODO:
      return state.map(todo => todo.id === action.payload ? { ...todo, done: !todo.done } : todo);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload);// 일치 하면 제거
    default:
      return state;
  }
}
export default todos;





