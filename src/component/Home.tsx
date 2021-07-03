import React, { useState } from 'react';
import { Divider, Grid, List, ListSubheader } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Search from './Search';
import UserList from './UserList';
import RepositoryList from './RepositoryList';
import config from '../config.json';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@global": {
      html: {
        fontSize: 12,
        [theme.breakpoints.up("sm")]: {
          fontSize: 18
        }
      }
    },
    root: {
      padding: theme.spacing(0.5),
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2)
      }
    },
    list: {
      width: '45%',
      maxWidth: 360,
      backgroundColor: theme.palette.grey[100],
      margin: theme.spacing(0, 1),
      borderRadius: theme.spacing(1)
    }
  })
);

interface variablesType {
  searchText: string,
  first?: number,
  last?: number,
  after?: string,
  before?: string
}

const Home = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState({ name: '', userName: '' });
  const [getUserVariables, setGetUserVariables] = useState<variablesType>({ searchText: '', first: config.limit });

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setSelectedUser({ name: '', userName: '' });
  }

  const handleUserNav = (variables: { first?: number, last?: number, after?: string, before?: string }) => {
    setGetUserVariables({
      ...variables,
      searchText
    });
  }

  const getUserListComponent = () => (
    <UserList
      variables={getUserVariables}
      selectedUserName={selectedUser.userName}
      itemClick={(name: string, userName: string) => setSelectedUser({ name, userName })}
      navClick={handleUserNav}
    />
  );

  const getRepositoryListComponent = () => (
    selectedUser.userName ?
      <RepositoryList selectedUser={selectedUser} />
      :
      <List
        className={classes.list}
        subheader={
          <ListSubheader component="div" id="list-header">
            No User Selected
          </ListSubheader>
        }
      />
  );

  return (
    <Grid className={classes.root}>
      <Search setSearchText={handleSearchChange} />
      <Grid container justify="center">
        {getUserListComponent()}
        <Divider orientation="vertical" flexItem />
        {getRepositoryListComponent()}
      </Grid>
    </Grid>
  );
}

export default Home;
