import './styles.scss';

import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import {IconButton, Paper} from '@mui/material';
import React, {FC} from 'react';
import MainLayout from 'src/components/templates/MainLayout';
import {bem, cn} from 'src/core/bem';

const footerTabs = bem(module.id, 'FooterTabs');
type FooterTabsProps = {
  className?: string;
};
const FooterTabs: FC<FooterTabsProps> = ({className}) => {
  return (
    <Paper className={cn(className, footerTabs())} variant="outlined">
      <IconButton className={root('')}>
        <FormatListBulletedSharpIcon
          sx={{fontSize: 32}}
          className={footerTabs('icon', {active: true})}
        />
      </IconButton>
    </Paper>
  );
};

const root = bem(module.id, 'MainPage');
const MainPage: FC = () => {
  return (
    <MainLayout header="Список дел">
      <div className={root()}>
        <div className={root('body')}></div>
        <FooterTabs className={root('footer')} />
      </div>
    </MainLayout>
  );
};

export default MainPage;
