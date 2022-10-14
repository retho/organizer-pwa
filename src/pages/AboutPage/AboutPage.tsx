import './styles.scss';

import {Paper} from '@mui/material';
import React, {FC} from 'react';
import MainLayout from 'src/components/templates/MainLayout';
import {bem} from 'src/core/bem';
import {stringifyRoute} from 'src/core/router';
import {routes} from 'src/router';

const root = bem(module.id, 'AboutPage');
const AboutPage: FC = () => {
  return (
    <MainLayout header={'About'} backTo={stringifyRoute(routes.settings, {}, {})}>
      <Paper className={root()}>
        <div>Commit SHA: N/A</div>
        <div>Build time: N/A</div>
      </Paper>
    </MainLayout>
  );
};

export default AboutPage;
