import './styles.scss';

import InfoIcon from '@mui/icons-material/Info';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper} from '@mui/material';
import React, {FC, useEffect} from 'react';
import {bem} from 'src/core/bem';
import {useDispatch} from 'src/core/redux';
import {Href, stringifyRoute} from 'src/core/router';
import {routes} from 'src/router';
import {loadTodoList} from 'src/store/slices/todoList';

type SettingsListItemProps = {
  href: Href;
  icon: JSX.Element;
  text: string;
};
const SettingsListItem: FC<SettingsListItemProps> = ({href, icon, text}) => {
  return (
    <ListItem disablePadding>
      <Paper style={{width: '100%'}}>
        <ListItemButton component="a" href={href}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </Paper>
    </ListItem>
  );
};

const root = bem(module.id, 'SettingsList');
const SettingsList: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodoList());
  }, []);

  return (
    <div className={root()}>
      <List>
        <SettingsListItem
          href={stringifyRoute(routes.settingsAbout, {}, {})}
          icon={<InfoIcon />}
          text="About"
        />
      </List>
    </div>
  );
};

export default SettingsList;
