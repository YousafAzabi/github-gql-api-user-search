import React, { useState } from 'react';
import UserList from './UserList';
import Search from './Search';
import { useQuery, gql } from '@apollo/client';


export default function Home() {
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState('');

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

  const getList = () => {
    if (error) { return <p>error</p> }
    if (loading) { return <p>Loading</p> }
    return <UserList data={data.search} />
  }

  return (
    <div className="home">
      <Search setSearchText={(text: string) => { setSearchText(text) }} />
      {getList()}
    </div>
  );
}
