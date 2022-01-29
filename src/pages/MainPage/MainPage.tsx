import './styles.scss';

import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import {IconButton, Paper} from '@mui/material';
import React, {FC} from 'react';
import MainLayout from 'src/components/templates/MainLayout';
import {bem, cn} from 'src/core/bem';

import TodoList from './TodoList';

const footerTabs = bem(module.id, 'FooterTabs');
type FooterTabsProps = {
  className?: string;
};
const FooterTabs: FC<FooterTabsProps> = ({className}) => {
  return (
    <Paper className={cn(className, footerTabs())} variant="outlined">
      <IconButton className={root('')} color="primary">
        <FormatListBulletedSharpIcon sx={{fontSize: 32}} />
      </IconButton>
    </Paper>
  );
};

const root = bem(module.id, 'MainPage');
const MainPage: FC = () => {
  return (
    <MainLayout header="Todo list">
      <div className={root()}>
        <div className={root('body')}>
          <TodoList />
        </div>
        <FooterTabs className={root('footer')} />
      </div>
    </MainLayout>
  );
};

export default MainPage;
