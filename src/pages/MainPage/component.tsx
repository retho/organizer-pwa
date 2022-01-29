import './styles.scss';

import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import {IconButton, Paper} from '@mui/material';
import React, {FC} from 'react';
import MainLayout from 'src/components/templates/MainLayout';
import {bem} from 'src/core/bem';

const root = bem(module.id, 'MainPage');
const MainPage: FC = () => {
  return (
    <MainLayout header="Main">
      <div className={root()}>
        <div className={root('body')}></div>
        <Paper className={root('footer')} variant="outlined">
          <IconButton>
            <FormatListBulletedSharpIcon sx={{fontSize: 32}} />
          </IconButton>
        </Paper>
      </div>
    </MainLayout>
  );
};

export default MainPage;
