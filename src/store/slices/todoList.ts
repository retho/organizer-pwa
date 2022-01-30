import {createSlice, createSliceName} from 'src/core/redux';
import {PayloadAction} from 'src/core/redux';
import {nanoid, sleep} from 'src/core/utils';
import {Timestamp, timestamp} from 'src/utils/timestamp';

import {AppThunk} from '..';

const sliceName = createSliceName(module.id, 'todoList');

const mock: TodoTask[] = [
  {
    id: nanoid(),
    created_at: timestamp(new Date()),
    title: 'title 1',
    items: [
      {id: nanoid(), done: false, description: 'todo1'},
      {id: nanoid(), done: true, description: 'todo2'},
    ],
  },
  {
    id: nanoid(),
    created_at: timestamp(new Date()),
    title: 'title 2',
    items: [
      {id: nanoid(), done: false, description: 'todo1'},
      {id: nanoid(), done: true, description: 'todo2'},
    ],
  },
];

export type TodoTask = {
  id: string;
  created_at: Timestamp;
  title: string;
  items: {id: string; done: boolean; description: string}[];
};

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
  await sleep(1_000);
  dispatch(setList(mock));
  dispatch(addFetching(-1));
};
