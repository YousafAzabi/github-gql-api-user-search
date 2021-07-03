import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { List, ListItem, ListItemText, ListSubheader, ListItemAvatar, Avatar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Navigation from './navigation';
import { GET_USERS } from '../graphql/queries';
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
interface userNodeType {
  name: string,
  login: string,
  avatarUrl: string
}

interface PropsType {
  variables: {
    searchText: string,
    first?: number,
    last?: number,
    after?: string,
    before?: string
  }
  selectedUserName: string,
  itemClick: (name: string, userName: string) => void,
  navClick: ({ }) => void
}

const UsersList: FC<PropsType> = ({ variables, selectedUserName, itemClick, navClick }) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_USERS, { variables: variables });

  const handleNavPage = (action: string) => {
    if (data) {
      if (action === 'next') {
        navClick({ first: config.limit, after: data.search.pageInfo.endCursor });
      } else {
        navClick({ last: config.limit, before: data.search.pageInfo.startCursor });
      }
    }
  }

  return (
    <List
      dense
      className={classes.root}
      aria-labelledby="user-list-header"
      subheader={
        <ListSubheader component="div" id="user-list-header">
          <h2>Users</h2>
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
              onClick={() => itemClick(node.name, node.login)}
            >
              <ListItemAvatar>
                <Avatar alt={`Avatar ${node.name}`} src={node.avatarUrl} />
              </ListItemAvatar>
              <ListItemText id={node.login} primary={node.name} />
            </ListItem>
          ))}
      <Navigation handleNext={() => handleNavPage('next')} handlePrev={() => handleNavPage('prev')} />
    </List>
  );
}

export default UsersList;