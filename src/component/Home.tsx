import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Search from './Search';
import UserList from './UserList';
import RepositoryList from './RepositoryList';
import config from '../config.json';

 const Home = () => {
  const [pageSize, setPageSize] = useState(config.defaultPageSize);
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] =useState('');

  const { loading, error, data } = useQuery(gql`
    {
      search(query: "${searchText}", type: USER, first: ${pageSize}) {
        nodes {
          ...on User {
            name
            avatarUrl
          }
        }
        userCount
      }
    }
  `);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setSelectedUser('');
  }

  const getList = () => {
    if (error) { return <p>error</p> }
    if (loading) { return <p>Loading</p> }
    return (
      <UserList
        data={data.search}
        selectedUser={selectedUser}
        clickItem={(userName: string) => setSelectedUser(userName)}
      />
    );
  }

  return (
    <div className="home">
      <Search setSearchText={handleSearchChange} />
      {getList()}
      <RepositoryList selectedUser={selectedUser} />
    </div>
  );
}

export default Home;
