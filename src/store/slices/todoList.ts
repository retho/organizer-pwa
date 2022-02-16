import {createSlice, createSliceName} from 'src/core/redux';
import {PayloadAction} from 'src/core/redux';
import {readTodoList, removeTodo, TodoTask, writeTodo} from 'src/storage/todos';

import {AppThunk} from '..';

const sliceName = createSliceName(module.id, 'todoList');

type State = {
  fetching: number;
  list: null | TodoTask[];
};
const defaultState: State = {
  fetching: 0,
  list: null,
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    addFetching: (state, {payload}: PayloadAction<1 | -1>) => ({
      ...state,
      fetching: state.fetching + payload,
    }),
    setList: (state, {payload}: PayloadAction<State['list']>) => ({
      ...state,
      list: payload,
    }),
    reset: () => defaultState,
  },
});

export const {reducer} = slice;
export const {reset, addFetching, setList} = slice.actions;

export const loadTodoList = (): AppThunk => async dispatch => {
  dispatch(addFetching(1));
  const list = readTodoList();
  dispatch(setList(list));
  dispatch(addFetching(-1));
};

export const saveTodo = (todo: TodoTask): AppThunk => async dispatch => {
  dispatch(addFetching(1));
  writeTodo(todo);
  dispatch(addFetching(-1));
};

export const deleteTodo = (todoId: string): AppThunk => async dispatch => {
  dispatch(addFetching(1));
  removeTodo(todoId);
  dispatch(addFetching(-1));
};
