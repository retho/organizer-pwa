import './styles.scss';

import {Add} from '@mui/icons-material';
import {Fab} from '@mui/material';
import React, {FC, useEffect} from 'react';
import Preloader from 'src/components/atoms/Preloader';
import {bem} from 'src/core/bem';
import {useDispatch, useSelector} from 'src/core/redux';
import {Link, stringifyRoute} from 'src/core/router';
import {routes} from 'src/router';
import {loadTodoList} from 'src/store/slices/todoList';

import TodoListItem from '../TodoListItem';

const root = bem(module.id, 'TodoList');
const TodoList: FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector(state => !!state.todoList.fetching);
  const todoList = useSelector(state => state.todoList.list);

  useEffect(() => {
    dispatch(loadTodoList());
  }, []);

  return (
    <div className={root()}>
      {loading && <Preloader />}
      {todoList?.map(todo => (
        <TodoListItem key={todo.id} task={todo} className={root('item')} />
      ))}
      <Fab
        color="primary"
        aria-label="add"
        className={root('add')}
        LinkComponent={Link}
        href={stringifyRoute(routes.todoNew, {}, {})}
      >
        <Add />
      </Fab>
    </div>
  );
};

export default TodoList;
