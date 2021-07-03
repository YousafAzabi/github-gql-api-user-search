import React, { FC } from 'react';
import { CircularProgress} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginTop: theme.spacing(3),
      '& > *': {
        margin: '0 auto'
      }
    }
  })
);

const Loading: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

export default Loading;