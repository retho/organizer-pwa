import {Backdrop, CircularProgress} from '@mui/material';
import React, {FC} from 'react';

const Preloader: FC = () => {
  return (
    <Backdrop open sx={{zIndex: theme => theme.zIndex.drawer + 1}}>
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

export default Preloader;
