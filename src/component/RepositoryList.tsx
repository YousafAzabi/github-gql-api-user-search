import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { List, ListItem, ListItemText, ListSubheader, Link } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import config from '../config.json';
import { GET_REPOSITORIES } from '../graphql/queries';

interface repoNodeType {
  name: string,
  url: string
}

interface PropsType {
  selectedUser: {
    name: string,
    userName: string
  },
  classes: ClassNameMap
}

const RepositoryList: FC<PropsType> = ({ classes, selectedUser }) => {
  const { error, loading, data } = useQuery(GET_REPOSITORIES, { variables: {
    userName: selectedUser.userName,
    limit:  config.limit
  }});

  return (
    <List
      dense
      className={classes.list}
      aria-labelledby="repo-list-header"
      subheader={
        <ListSubheader component="div" id="repo-list-header">
          <h1>{selectedUser.name}</h1>
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