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
        <div>Build time: {process.env.REACT_APP_BUILD_TIME || 'N/A'}</div>
        <div>Commit SHA (short): {process.env.REACT_APP_COMMIT_SHA_SHORT || 'N/A'}</div>
        <div>Commit SHA (full): {process.env.REACT_APP_COMMIT_SHA_FULL || 'N/A'}</div>
      </Paper>
    </MainLayout>
  );
};

export default AboutPage;
