import {compact, union} from 'lodash-es';
import {lsGet, lskey, lsRemove, lsSet, lsUpdate} from 'src/core/ls';
import {Timestamp} from 'src/utils/timestamp';

const lskeyTodo = (id: string) => lskey<TodoTask>(`todo-${id}`);
const lskeyTodoList = lskey<string[]>('todolist');

export type TodoTaskItem = {id: string; done: boolean; description: string};
export type TodoTask = {
  id: string;
  created_at: Timestamp;
  title: string;
  items: TodoTaskItem[];
};

export const readTodo = (id: string): null | TodoTask => lsGet(lskeyTodo(id));

export const writeTodo = (todo: TodoTask): void => {
  lsSet(lskeyTodo(todo.id), todo);
  lsUpdate(lskeyTodoList, todoIdsList => union(todoIdsList || [], [todo.id]));
};

export const removeTodo = (id: string): void => {
  lsRemove(lskeyTodo(id));
  lsUpdate(lskeyTodoList, todoIdsList => (todoIdsList || []).filter(x => x !== id));
};

export const readTodoList = (): TodoTask[] =>
  compact((lsGet(lskeyTodoList) || []).map(id => lsGet(lskeyTodo(id))));
