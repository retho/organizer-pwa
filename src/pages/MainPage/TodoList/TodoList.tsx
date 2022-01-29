import './styles.scss';

import {Add} from '@mui/icons-material';
import {Fab} from '@mui/material';
import React, {FC} from 'react';
import {bem} from 'src/core/bem';
import {nanoid} from 'src/core/utils';
import {timestamp} from 'src/utils/timestamp';

import TodoListItem, {TodoTask} from '../TodoListItem';

const todoList: TodoTask[] = [
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

const root = bem(module.id, 'TodoList');
const TodoList: FC = () => {
  return (
    <div className={root()}>
      {todoList.map(todo => (
        <TodoListItem key={todo.id} task={todo} className={root('item')} />
      ))}
      <Fab color="primary" aria-label="add" className={root('add')}>
        <Add />
      </Fab>
    </div>
  );
};

export default TodoList;
