import './styles.scss';

import {Add} from '@mui/icons-material';
import {Fab} from '@mui/material';
import React, {FC, useEffect} from 'react';
import Preloader from 'src/components/misc/Preloader';
import {bem} from 'src/core/bem';
import {useDispatch, useSelector} from 'src/core/redux';
import {Link, stringifyRoute} from 'src/core/router';
import {routes} from 'src/router';
import {TodoTask} from 'src/storage/todos';
import {deleteTodo, loadTodoList, saveTodo} from 'src/store/slices/todoList';

import TodoListItem from '../TodoListItem';

const root = bem(module.id, 'TodoList');
const TodoList: FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector(state => !!state.todoList.fetching);
  const todoList = useSelector(state => state.todoList.list);

  useEffect(() => {
    dispatch(loadTodoList());
  }, []);

  const handleChange = async (task: TodoTask) => {
    await dispatch(saveTodo(task));
    dispatch(loadTodoList());
  };
  const handleRemove = async (todoId: string) => {
    await dispatch(deleteTodo(todoId));
    dispatch(loadTodoList());
  };

  return (
    <div className={root()}>
      {loading && <Preloader />}
      {todoList?.map(todo => (
        <TodoListItem
          key={todo.id}
          className={root('item')}
          value={todo}
          onChange={handleChange}
          onRemove={handleRemove}
        />
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
