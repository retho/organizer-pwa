import {combineReducers} from 'src/core/redux';

import {reducer as app} from './slices/app';
import {reducer as todoList} from './slices/todoList';

const rootReducer = combineReducers({
  app,
  todoList,
});

export {rootReducer as reducer};
