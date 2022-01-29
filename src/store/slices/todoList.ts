import {createSlice, createSliceName} from 'src/core/redux';
import {PayloadAction} from 'src/core/redux';
import {ADT, nanoid, sleep} from 'src/core/utils';
import {Timestamp, timestamp} from 'src/utils/timestamp';

import {AppThunk} from '..';

const sliceName = createSliceName(module.id, 'todoList');

const mock: TodoTask[] = [
  {
    id: nanoid(),
    created_at: timestamp(new Date()),
    title: 'title 1',
    description: 'description',
    status: {kind: 'in_progress'},
  },
  {
    id: nanoid(),
    created_at: timestamp(new Date()),
    title: 'title 2',
    description: 'description',
    status: {kind: 'in_progress'},
  },
];

export type TodoTask = {
  id: string;
  created_at: Timestamp;
  title: string;
  description: string;
  status:
    | ADT<'in_progress'>
    | ADT<
        'done',
        {
          at: Timestamp;
        }
      >;
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
  await sleep(2_000);
  dispatch(setList(mock));
  dispatch(addFetching(-1));
};
