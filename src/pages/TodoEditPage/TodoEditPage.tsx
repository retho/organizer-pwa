import './styles.scss';

import {Add, Close, Done, EditTwoTone} from '@mui/icons-material';
import {IconButton, Paper, TextField} from '@mui/material';
import React, {FC, useLayoutEffect, useState} from 'react';
import MainLayout from 'src/components/templates/MainLayout';
import {bem} from 'src/core/bem';
import {stringifyRoute, useHistory} from 'src/core/router';
import {nanoid} from 'src/core/utils';
import {routes} from 'src/router';
import {TodoTaskItem} from 'src/store/slices/todoList';

const taskItemEdit = bem(module.id, 'TodoTaskItemEdit');
type TodoTaskItemProps = {
  value: null | TodoTaskItem;
  onChange: (val: TodoTaskItem) => void;
};
const TodoTaskItemEdit: FC<TodoTaskItemProps> = ({value, onChange}) => {
  const [description, setDescription] = useState(value?.description || '');
  const [editMode, setEditMode] = useState(!value);

  const handleEditDoneBtnClick = () => {
    if (editMode) {
      if (!description) return;
      onChange({
        id: value?.id ?? nanoid(),
        done: value?.done ?? false,
        description,
      });
    } else {
      setEditMode(true);
    }
  };

  useLayoutEffect(() => {
    if (value) {
      setEditMode(false);
      setDescription(value.description);
    }
  }, [value]);

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
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        ) : (
          description
        )}
      </div>
    </div>
  );
};

const root = bem(module.id, 'TodoEditPage');
const TodoEditPage: FC = () => {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [taskItems, setTaskItems] = useState<TodoTaskItem[]>([]);
  const [addingNew, setAddingNew] = useState(false);

  const handleTaskEdit = (task: TodoTaskItem) =>
    setTaskItems(list => list.map(x => (x.id !== task.id ? x : task)));
  const handleTaskNew = (task: TodoTaskItem) => {
    setTaskItems(list => [...list, task]);
    setAddingNew(false);
  };

  const handleOk = () => history.push(stringifyRoute(routes.todoList, {}, {}));
  const handleClose = () => history.push(stringifyRoute(routes.todoList, {}, {}));

  return (
    <MainLayout header="New todo" backTo={stringifyRoute(routes.todoList, {}, {})}>
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
          Items:
          <div>
            {taskItems.map(item => (
              <TodoTaskItemEdit key={item.id} value={item} onChange={handleTaskEdit} />
            ))}
            {addingNew ? (
              <TodoTaskItemEdit key="new" value={null} onChange={handleTaskNew} />
            ) : (
              <IconButton onClick={() => setAddingNew(true)}>
                {<Add sx={{fontSize: 24}} color="primary" />}
              </IconButton>
            )}
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
