import React, { FC, useState } from 'react';
import { ApolloError } from '@apollo/client';
import { List, ListSubheader } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Selector from './Selector';
import Navigation from './Navigation';
import Loading from './Loading';
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
  fetchData: ({ }) => void
}

const RepositoryList: FC<PropsType> = ({ title, error, loading, pageInfo, fetchData, children }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(config.limit);

  const handleLimitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLimit(event.target.value as number);
    fetchData({ first: event.target.value })
  };

  const handleNavPage = (action: string) => {
    if (action === 'next') {
      fetchData({ first: limit, after: pageInfo.endCursor });
    } else {
      fetchData({ last: limit, before: pageInfo.startCursor });
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
          <Selector numberOfItems={limit} handleChange={handleLimitChange} />
        </ListSubheader>
      }
    >
      {error ?
        <Error message={title === 'Users' ? 'Users' : `Repositories for ${title}`} />
        :
        loading ?
          <Loading />
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