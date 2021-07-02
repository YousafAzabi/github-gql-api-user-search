import React, { FC, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { List, ListItem, ListItemText, ListSubheader, Link } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import config from '../config.json';

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
  const [pageSize, setPageSize] = useState(config.defaultPageSize);
  const [limitOffset, setLimitOffset] = useState(`first: ${pageSize}`);

  const { error, loading, data } = useQuery(gql`
    {
      user(login: "${selectedUser.userName}") {
        repositories(${limitOffset}) {
          nodes {
            name
            url
          }
          pageInfo {
            startCursor
            endCursor
          }
        }
      }
    }
  `);

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