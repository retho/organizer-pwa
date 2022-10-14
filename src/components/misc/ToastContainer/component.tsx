import 'react-toastify/dist/ReactToastify.css';

import React, {FC} from 'react';
// eslint-disable-next-line no-restricted-imports
import {ToastContainer as ToastContainerOrigin} from 'react-toastify';

const ToastContainer: FC = () => {
  return <ToastContainerOrigin />;
};

export default ToastContainer;
