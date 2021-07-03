import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { List, ListItem, ListItemText, ListSubheader, Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Navigation from './navigation';
import { GET_REPOSITORIES } from '../graphql/queries';
import config from '../config.json';

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
interface repoNodeType {
  name: string,
  url: string
}

interface PropsType {
  variables: {
    userName: string,
    first?: number,
    last?: number,
    after?: string,
    before?: string
  }
  selectedUserName: string,
  navClick: ({ }) => void
}

const RepositoryList: FC<PropsType> = ({ variables, selectedUserName, navClick }) => {
  const classes = useStyles();

  const { error, loading, data } = useQuery(GET_REPOSITORIES, { variables: variables });
  const pageInfo = data && data.user.repositories.pageInfo;

  const handleNavPage = (action: string) => {
    if (data) {
      if (action === 'next') {
        navClick({ first: config.limit, after: pageInfo.endCursor });
      } else {
        navClick({ last: config.limit, before: pageInfo.startCursor });
      }
    }
  }

  return (
    <List
      dense
      className={classes.root}
      aria-labelledby="repo-list-header"
      subheader={
        <ListSubheader component="div" id="repo-list-header">
          <h2 className={classes.header}>{selectedUserName}</h2>
        </ListSubheader>
      }
    >
      {error ?
        <p>error</p>
        :
        loading ?
          <p>Loading</p>
          :
          data.user.repositories.nodes.map((node: repoNodeType, index: number) => (
            <ListItem key={index} button>
              <Link href={node.url}>
                <ListItemText id={node.name} primary={node.name} />
              </Link>
            </ListItem>
          ))}
      <Navigation
        handleNext={() => handleNavPage('next')}
        handlePrev={() => handleNavPage('prev')}
        enableNext={data && pageInfo.hasNextPage}
        enablePrev={data && pageInfo.hasPreviousPage}
      />
    </List>
  );
}

export default RepositoryList;