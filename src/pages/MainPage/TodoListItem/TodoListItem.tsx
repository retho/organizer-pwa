import './styles.scss';

import {Paper} from '@mui/material';
import React, {FC} from 'react';
import {bem, cn} from 'src/core/bem';
import {TodoTask} from 'src/store/slices/todoList';

const root = bem(module.id, 'TodoListItem');
type Props = {
  className?: string;
  task: TodoTask;
};
const TodoListItem: FC<Props> = ({className, task}) => {
  return (
    <Paper className={cn(className, root())}>
      <div>{task.title}</div>
      <div>{task.description}</div>
    </Paper>
  );
};

export default TodoListItem;
