import './styles.scss';

import {DeleteTwoTone, EditTwoTone} from '@mui/icons-material';
import {Card, CardContent, Checkbox, FormControlLabel, IconButton} from '@mui/material';
import React, {FC} from 'react';
import {bem, cn} from 'src/core/bem';
import {Link, stringifyRoute} from 'src/core/router';
import {routes} from 'src/router';
import {TodoTask} from 'src/storage/todos';

const root = bem(module.id, 'TodoListItem');
type Props = {
  className?: string;
  value: TodoTask;
  onChange: (value: TodoTask) => void;
};
const TodoListItem: FC<Props> = ({className, value, onChange}) => {
  const handleCheckedChange = (itemId: string) => (_: unknown, checked: boolean) => {
    onChange({
      ...value,
      items: value.items.map(item => {
        if (item.id !== itemId) return item;
        return {
          ...item,
          done: checked,
        };
      }),
    });
  };

  return (
    <Card className={cn(className, root())}>
      <CardContent>
        <div className={root('title')}>
          {value.title}
          <IconButton
            LinkComponent={Link}
            href={stringifyRoute(routes.todoEdit, {todoId: value.id}, {})}
          >
            <EditTwoTone sx={{fontSize: 24}} />
          </IconButton>
          <div className={root('divider')} />
          <IconButton disabled={value.items.some(x => !x.done)}>
            <DeleteTwoTone sx={{fontSize: 24}} />
          </IconButton>
        </div>
        <div>
          {value.items.map(item => (
            <div key={item.id}>
              <FormControlLabel
                control={<Checkbox checked={item.done} onChange={handleCheckedChange(item.id)} />}
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
