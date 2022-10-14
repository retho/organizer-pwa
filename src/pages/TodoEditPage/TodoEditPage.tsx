import './styles.scss';

import {Close, Done, EditTwoTone} from '@mui/icons-material';
import {IconButton, Paper, TextField, Typography} from '@mui/material';
import React, {FC, useLayoutEffect, useMemo, useState} from 'react';
import Preloader from 'src/components/misc/Preloader';
import MainLayout from 'src/components/templates/MainLayout';
import {bem} from 'src/core/bem';
import {useDispatch, useSelector} from 'src/core/redux';
import {stringifyRoute, useHistory} from 'src/core/router';
import {nanoid} from 'src/core/utils';
import {routes} from 'src/router';
import {readTodo, TodoTaskItem} from 'src/storage/todos';
import {saveTodo} from 'src/store/slices/todoList';
import {Timestamp, timestamp} from 'src/utils/timestamp';

const taskItemEdit = bem(module.id, 'TodoTaskItemEdit');
type TodoTaskItemProps = {
  value: null | TodoTaskItem;
  defaultEditMode?: boolean;
  onChange: (val: TodoTaskItem) => void;
  onEdit?: (val: TodoTaskItem) => void;
};
const TodoTaskItemEdit: FC<TodoTaskItemProps> = ({value, defaultEditMode, onChange, onEdit}) => {
  const [editMode, setEditMode] = useState(!!defaultEditMode);

  const [editedValue, setEditedValue] = useState(
    value || {
      id: nanoid(),
      done: false,
      description: '',
    }
  );
  useLayoutEffect(() => {
    if (value) setEditedValue(value);
  }, [value]);

  useLayoutEffect(() => {
    if (editMode && onEdit) onEdit(editedValue);
  }, [editedValue]);

  const handleEditDoneBtnClick = () => {
    if (editMode) {
      if (!editedValue.description) return;
      setEditMode(false);
      onChange(editedValue);
    } else {
      setEditMode(true);
    }
  };

  return (
    <div className={taskItemEdit()}>
      <IconButton className={taskItemEdit('btn')} onClick={handleEditDoneBtnClick}>
        {editMode ? (
          <Done sx={{fontSize: 24}} color="success" />
        ) : (
          <EditTwoTone sx={{fontSize: 24}} color="warning" />
        )}
      </IconButton>
      <div className={taskItemEdit('description')}>
        {editMode ? (
          <TextField
            className={taskItemEdit('textinput')}
            variant="standard"
            value={editedValue.description}
            onChange={e => setEditedValue(val => ({...val, description: e.target.value}))}
          />
        ) : (
          editedValue.description
        )}
      </div>
    </div>
  );
};

const root = bem(module.id, 'TodoEditPage');
type TodoEditPageProps = {
  todoId?: null | string;
};
const TodoEditPage: FC<TodoEditPageProps> = ({todoId: editedTodoId}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector(state => !!state.todoList.fetching);

  const todoId = useMemo(() => editedTodoId || nanoid(), [editedTodoId]);

  const [created_at, set_created_at] = useState<null | Timestamp>(null);
  const [title, setTitle] = useState('');
  const [taskItems, setTaskItems] = useState<TodoTaskItem[]>([]);
  const [editedTask, setEditedTask] = useState<null | TodoTaskItem>(null);

  useLayoutEffect(() => {
    if (editedTodoId) {
      const editedTodo = readTodo(editedTodoId);
      if (!editedTodo) return;
      setTitle(editedTodo.title);
      setTaskItems(editedTodo.items);
      set_created_at(editedTodo.created_at);
    }
  }, [editedTodoId]);

  const handleTaskEdit = (task: TodoTaskItem) =>
    setTaskItems(list => list.map(x => (x.id !== task.id ? x : task)));
  const handleEditNew = (task: TodoTaskItem) => setEditedTask(task);
  const handleTaskNew = (task: TodoTaskItem) => {
    setTaskItems(list => [...list, task]);
    setEditedTask(null);
  };

  const handleOk = async () => {
    await dispatch(
      saveTodo({
        id: todoId,
        created_at: created_at || timestamp(new Date()),
        title,
        items: taskItems,
      })
    );
    history.push(stringifyRoute(routes.todoList, {}, {}));
  };
  const handleClose = () => history.push(stringifyRoute(routes.todoList, {}, {}));

  return (
    <MainLayout
      header={editedTodoId ? 'Edit' : 'New'}
      backTo={stringifyRoute(routes.todoList, {}, {})}
    >
      {loading && <Preloader />}
      <div className={root()}>
        <div className={root('body')}>
          <TextField
            className={root('title')}
            label="Title"
            variant="standard"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <br />
          <br />
          <Typography color="secondary">Items:</Typography>
          <div>
            {taskItems.map(item => (
              <TodoTaskItemEdit key={item.id} value={item} onChange={handleTaskEdit} />
            ))}
            <TodoTaskItemEdit
              key={`new-${editedTask?.id || ''}`}
              value={editedTask}
              defaultEditMode
              onEdit={handleEditNew}
              onChange={handleTaskNew}
            />
          </div>
        </div>
        <Paper className={root('footer')} variant="outlined">
          <IconButton className={root('')} onClick={handleOk}>
            <Done sx={{fontSize: 32}} color="success" />
          </IconButton>
          <IconButton className={root('')} onClick={handleClose}>
            <Close sx={{fontSize: 32}} color="error" />
          </IconButton>
        </Paper>
      </div>
    </MainLayout>
  );
};

export default TodoEditPage;
