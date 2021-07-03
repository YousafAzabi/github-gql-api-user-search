import React, { FC } from 'react';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block',
      marginTop: theme.spacing(5)
    },
    content: {
      position: 'absolute',
      width: '100%',
      bottom: theme.spacing(1)
    },
    previous: {
      float: 'left',
      marginLeft: theme.spacing(1)
    },
    next: {
      float: 'right',
      marginRight: theme.spacing(1)
    }
  })
);
interface PropsType {
  handleNext: React.MouseEventHandler<HTMLButtonElement>,
  handlePrev: React.MouseEventHandler<HTMLButtonElement>
}

const Navigation: FC<PropsType> = ({ handleNext, handlePrev }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <IconButton
          aria-label="previous"
          className={classes.previous}
          size="small"
          onClick={handlePrev}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="next"
          className={classes.next}
          size="small"
          onClick={handleNext}
        >
          <ArrowForwardIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}

export default Navigation;