import React, { FC } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface userNodeType {
  name: string,
  avatarUrl: string
}

interface PropsType {
  data: {
    nodes: [userNodeType],
    userCount: number
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const UsersList: FC<PropsType> = ({ data }) => {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {data.nodes.map((node: userNodeType) => (
        <ListItem key={node.name} button>
          <ListItemAvatar>
            <Avatar
              alt={`Avatar ${node.name}`}
              src={node.avatarUrl}
            />
          </ListItemAvatar>
          <ListItemText id={node.name} primary={node.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default UsersList;