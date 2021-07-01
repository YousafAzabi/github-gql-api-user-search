import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Search from './Search';
import UserList from './UserList';
import RepositoryList from './RepositoryList';
import config from '../config.json';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const Home = () => {
  const [pageSize, setPageSize] = useState(config.defaultPageSize);
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] =useState({name: '', userName: ''});

  const classes = useStyles();

  const { loading, error, data } = useQuery(gql`
    {
      search(query: "${searchText}", type: USER, first: ${pageSize}) {
        nodes {
          ...on User {
            name
            login
            avatarUrl
          }
        }
        userCount
      }
    }
  `);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setSelectedUser({name: '', userName: ''});
  }

  const getList = () => {
    if (error) { return <p>error</p> }
    if (loading) { return <p>Loading</p> }
    return (
      <UserList
        classes={classes}
        data={data.search}
        selectedUserName={selectedUser.userName}
        clickItem={(name: string, userName: string) => setSelectedUser({name, userName})}
      />
    );
  }

  return (
    <div className="home">
      <Search setSearchText={handleSearchChange} />
      {getList()}
      {selectedUser.userName && <RepositoryList classes={classes} selectedUser={selectedUser} />}
    </div>
  );
}

export default Home;
