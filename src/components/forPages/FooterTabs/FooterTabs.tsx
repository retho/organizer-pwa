import './styles.scss';

import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import SettingsIcon from '@mui/icons-material/Settings';
import {IconButton, Paper} from '@mui/material';
import React, {FC} from 'react';
import {bem, cn} from 'src/core/bem';
import {A, stringifyRoute} from 'src/core/router';
import {routes} from 'src/router';

export enum FooterTab {
  todoList = 1,
  settings,
}
const footerTabs = bem(module.id, 'FooterTabs');
type FooterTabsProps = {
  activeTab: FooterTab;
  className?: string;
};
const FooterTabs: FC<FooterTabsProps> = ({activeTab, className}) => {
  const getColor = (actv: boolean) => (actv ? 'primary' : 'default');

  return (
    <Paper className={cn(className, footerTabs())} variant="outlined">
      <IconButton
        color={getColor(activeTab === FooterTab.todoList)}
        component={A}
        href={stringifyRoute(routes.todoList, {}, {})}
      >
        <FormatListBulletedSharpIcon sx={{fontSize: 32}} />
      </IconButton>
      <IconButton
        color={getColor(activeTab === FooterTab.settings)}
        component={A}
        href={stringifyRoute(routes.settings, {}, {})}
      >
        <SettingsIcon sx={{fontSize: 32}} />
      </IconButton>
    </Paper>
  );
};

export default FooterTabs;
