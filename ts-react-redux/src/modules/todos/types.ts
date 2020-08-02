import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export type TodosAction = ActionType<typeof actions>;

  //각 각 Todo 대한 타입 설정
export type Todo = {
    id: number,
    text: string,
    done: boolean
  }
export type TodoState = Todo[];

