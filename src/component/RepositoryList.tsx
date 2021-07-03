import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { List, ListItem, ListItemText, ListSubheader, Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
    }
  })
);
interface repoNodeType {
  name: string,
  url: string
}

interface PropsType {
  selectedUser: {
    name: string,
    userName: string
  }
}

const RepositoryList: FC<PropsType> = ({ selectedUser }) => {
  const classes = useStyles();

  const { error, loading, data } = useQuery(GET_REPOSITORIES, {
    variables: {
      userName: selectedUser.userName,
      limit: config.limit
    }
  });

  return (
    <List
      dense
      className={classes.root}
      aria-labelledby="repo-list-header"
      subheader={
        <ListSubheader component="div" id="repo-list-header">
          <h2>{selectedUser.name}</h2>
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
    </List>
  );
}

export default RepositoryList;