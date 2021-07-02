import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { List, ListItem, ListItemText, ListSubheader, ListItemAvatar, Avatar } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { GET_USERS } from '../graphql/queries';
import config from '../config.json';

interface userNodeType {
  name: string,
  login: string,
  avatarUrl: string
}

interface PropsType {
  classes: ClassNameMap,
  searchText: string,
  selectedUserName: string,
  clickItem: (name: string, userName: string) => void
}

const UsersList: FC<PropsType> = ({ classes, searchText, selectedUserName, clickItem }) => {
  const { loading, error, data } = useQuery(GET_USERS, { variables: {
    searchText,
    limit: config.limit
  }});

  return (
    <List
      dense
      className={classes.list}
      aria-labelledby="user-list-header"
      subheader={
        <ListSubheader component="div" id="user-list-header">
          <h1>Users</h1>
        </ListSubheader>
      }
    >
      {error ?
        <p>error</p>
      :
      loading ?
        <p>Loading</p>
      :
      data.search.nodes.map((node: userNodeType) => (
        <ListItem
          key={node.login}
          button
          selected={node.login === selectedUserName}
          onClick={() => clickItem(node.name, node.login)}
        >
          <ListItemAvatar>
            <Avatar alt={`Avatar ${node.name}`} src={node.avatarUrl} />
          </ListItemAvatar>
          <ListItemText id={node.login} primary={node.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default UsersList;