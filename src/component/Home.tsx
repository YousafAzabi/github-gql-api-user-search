import React from 'react';
import List from './List';
import Search from './Search';

export default function Home() {
  return (
    <div className="home">
      <Search />
      <List />
    </div>
  );
}
