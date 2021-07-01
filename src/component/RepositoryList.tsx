import React, { FC } from 'react';
import { useQuery, gql } from '@apollo/client';
import { List, ListItem, ListItemText, ListSubheader, Link } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

interface PropsType {
  selectedUser: {
    name: string,
    userName: string
  },
  classes: ClassNameMap<"list">
}

interface repoNodeType {
  name: string,
  url: string
}

const RepositoryList: FC<PropsType> = ({ classes, selectedUser }) => {
  const { loading, error, data } = useQuery(gql`
    {
      user(login: "${selectedUser.userName}") {
        repositories(first: 10){
          nodes{
            name
            url
          }
        }
      }
    }
  `);

  if (error) { return <p>error</p> }
  if (loading) { return <p>Loading</p> }

  return (
    <List
      dense
      className={classes.list}
      aria-labelledby="list-header"
      subheader={
        <ListSubheader component="div" id="list-header">
          {selectedUser.name}
        </ListSubheader>
      }
    >
      {data.user.repositories.nodes.map((node: repoNodeType, index: number) => (
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