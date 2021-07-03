import React, { FC } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

interface PropsType {
  message: string
}

const Error: FC<PropsType> = ({ message }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      There is an error fetching the <strong>{message}</strong>
    </Alert>
  );
}

export default Error;