import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from './common/List';
import { GET_USERS } from '../graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      [theme.breakpoints.down("xs")]: {
        minWidth: theme.spacing(5),
        '& > *': {
          width: theme.spacing(4),
          height: theme.spacing(4),
        }
      }
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

const UsersList: FC<PropsType> = ({ variables, selectedUserName, navClick, itemClick }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_USERS, { variables: variables });

  return (
    <List
      title="User"
      error={error}
      loading={loading}
      pageInfo={data && data.search.pageInfo}
      navClick={navClick}
    >
      {data && data.search.nodes.map((node: userNodeType) => (
        <ListItem
          key={node.login}
          button
          selected={node.login === selectedUserName}
          onClick={() => itemClick(node.name, node.login)}
        >
          <ListItemAvatar className={classes.avatar}>
            <Avatar alt={node.name} src={node.avatarUrl} />
          </ListItemAvatar>
          <ListItemText id={node.login} primary={node.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default UsersList;