import React, { FC } from 'react';
import { ApolloError } from '@apollo/client';
import { List, ListSubheader } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Navigation from './Navigation';
import Error from './Error';
import config from '../../config.json';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '45%',
      maxWidth: 360,
      backgroundColor: theme.palette.grey[100],
      margin: theme.spacing(0, 1),
      borderRadius: theme.spacing(1)
    },
    header: {
      margin: `${theme.spacing(1)}px 0`
    }
  })
);

interface PropsType {
  title: string,
  pageInfo: {
    endCursor: number,
    startCursor: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
  },
  error?: ApolloError,
  loading?: boolean,
  navClick: ({ }) => void
}

const RepositoryList: FC<PropsType> = ({ title, error, loading, pageInfo, navClick, children }) => {
  const classes = useStyles();

  const handleNavPage = (action: string) => {
    if (action === 'next') {
      navClick({ first: config.limit, after: pageInfo.endCursor });
    } else {
      navClick({ last: config.limit, before: pageInfo.startCursor });
    }
  }

  return (
    <List
      dense
      className={classes.root}
      aria-labelledby="repo-list-header"
      subheader={
        <ListSubheader component="div" id="repo-list-header">
          <h2 className={classes.header}>{title}</h2>
        </ListSubheader>
      }
    >
      {error ?
        <Error message={title === 'Users' ? 'Users' : `Repositories for ${title}`} />
        :
        loading ?
          <p>Loading</p>
          :
          <>
            {children}
            <Navigation
              handleNext={() => handleNavPage('next')}
              handlePrev={() => handleNavPage('prev')}
              enableNext={pageInfo.hasNextPage}
              enablePrev={pageInfo.hasPreviousPage}
            />
          </>
      }
      
    </List>
  );
}

export default RepositoryList;