import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { ListItem, ListItemText, Link } from '@material-ui/core';
import List from './common/List';
import { GET_REPOSITORIES } from '../graphql/queries';
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
  const { loading, error, data } = useQuery(GET_REPOSITORIES, { variables: variables });

  return (
    <List
      title={selectedUserName}
      error={error}
      loading={loading}
      pageInfo={data && data.user.repositories.pageInfo}
      navClick={navClick}
    >
      {data && data.user.repositories.nodes.map((node: repoNodeType, index: number) => (
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