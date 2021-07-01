import React, { FC } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

interface userNodeType {
  name: string,
  login: string,
  avatarUrl: string
}

interface PropsType {
  data: {
    nodes: [userNodeType],
    userCount: number
  },
  selectedUserName: string,
  clickItem: (name: string, userName: string) => void,
  classes: ClassNameMap<"list">
}



const UsersList: FC<PropsType> = ({ classes, data, selectedUserName, clickItem }) => {

  return (
    <List dense className={classes.list}>
      {data.nodes.map((node: userNodeType) => (
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