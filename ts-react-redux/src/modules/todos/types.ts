import {ActionType} from 'typesafe-actions';
//action / actino 생성자 함수에 있는 모든 것들이 여기로 불려움
import * as actions from './actions';

export type TodosAction = ActionType<typeof actions>;

  //각 각 Todo 대한 타입 설정
export type Todo = {
    id: number,
    text: string,
    done: boolean
  }
export type TodoState = Todo[];

