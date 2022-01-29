import './styles.scss';

import {ArrowBack} from '@mui/icons-material';
import {Paper} from '@mui/material';
import React, {FC, ReactNode} from 'react';
import {bem} from 'src/core/bem';
import {Href, Link} from 'src/core/router';

const root = bem(module.id, 'MainLayout');

type Props = {
  backTo?: Href;
  header: string | ReactNode;
};
const MainLayout: FC<Props> = ({backTo, header, children}) => {
  return (
    <div className={root()}>
      <Paper className={root('header')}>
        {backTo && (
          <Link href={backTo} className={root('backIcon')}>
            <ArrowBack />
          </Link>
        )}
        {header}
      </Paper>
      <div className={root('body')}>
        <div className={root('bodyContainer')}>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
