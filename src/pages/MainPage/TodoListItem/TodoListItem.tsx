import './styles.scss';

import {DeleteTwoTone, EditTwoTone} from '@mui/icons-material';
import {Card, CardContent, Checkbox, FormControlLabel, IconButton} from '@mui/material';
import React, {FC} from 'react';
import {bem, cn} from 'src/core/bem';
import {TodoTask} from 'src/storage/todos';

const root = bem(module.id, 'TodoListItem');
type Props = {
  className?: string;
  task: TodoTask;
};
const TodoListItem: FC<Props> = ({className, task}) => {
  return (
    <Card className={cn(className, root())}>
      <CardContent>
        <div className={root('title')}>
          {task.title}
          <IconButton>
            <EditTwoTone sx={{fontSize: 24}} />
          </IconButton>
          <div className={root('divider')} />
          <IconButton disabled={task.items.some(x => !x.done)}>
            <DeleteTwoTone sx={{fontSize: 24}} />
          </IconButton>
        </div>
        <div>
          {task.items.map(item => (
            <div key={item.id}>
              <FormControlLabel
                control={<Checkbox checked={item.done} />}
                label={
                  <span className={root('itemLabel', {done: item.done})}>{item.description}</span>
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoListItem;
