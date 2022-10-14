import './styles.scss';

import React, {FC, useEffect} from 'react';
import {bem} from 'src/core/bem';
import {useDispatch} from 'src/core/redux';
import {loadTodoList} from 'src/store/slices/todoList';

const root = bem(module.id, 'SettingsList');
const TodoList: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodoList());
  }, []);

  return (
    <div className={root()}>
      <div>About</div>
    </div>
  );
};

export default TodoList;
