import React from 'react';
import List from './List';
import Search from './Search';
import { useQuery, gql } from '@apollo/client';


export default function Home() {
  const { loading, error, data } = useQuery(gql`
    {
      search(query: "yousaf", type: USER, first: 5) {
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

  if (error) { return <p>error</p> }
  if (loading) { return <p>Loading</p> }

  return (
    <div className="home">
      <Search />
      <List />
    </div>
  );
}
