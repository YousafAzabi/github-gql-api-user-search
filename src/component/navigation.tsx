import React, { FC } from 'react';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

interface PropsType {
  classes: ClassNameMap
}

const Navigation: FC<PropsType> = ({classes }) => {
  return (
    <div className={classes.nav}>
      <IconButton aria-label="previous" className={classes.previous} size="small">
          <ArrowBackIcon fontSize="inherit" />
      </IconButton>
      <IconButton aria-label="next" className={classes.next} size="small">
          <ArrowForwardIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
}

export default Navigation;