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
        fontSize: 14,
        [theme.breakpoints.up("sm")]: {
          fontSize: 18
        }
      }
    },
    root: {
      display: 'flex',
      flexFlow: 'column',
      minHeight: `calc(100vh - ${theme.spacing(1)}px)`,
      padding: theme.spacing(0.5),
      [theme.breakpoints.up("sm")]: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
        padding: theme.spacing(1)
      }
    },
    content: {
      flex: '1 1 auto'
    },
    list: {
      width: '45%',
      maxWidth: 360,
      backgroundColor: theme.palette.grey[100],
      margin: theme.spacing(0, 1),
      borderRadius: theme.spacing(2),
      '& > *': {
        borderRadius: theme.spacing(1)
      }
    }
  })
);

interface variablesType {
  first?: number,
  last?: number,
  after?: string,
  before?: string
}

interface userQueryVariablesType extends variablesType {
  searchText: string
}

interface repoQueryVariablesType extends variablesType {
  userName: string
}

const Home = () => {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState({ name: '', userName: '' });
  const [getUserQueryVariables, setGetUserQueryVariables] = useState<userQueryVariablesType>({ searchText: '', first: config.limit });
  const [getRepoQueryVariables, setGetRepoQueryVariables] = useState<repoQueryVariablesType>({userName: ''});

  const handleSearchChange = (text: string) => {
    setGetUserQueryVariables({ searchText: text, first: config.limit });
    setSelectedUser({ name: '', userName: '' });
  }

  const handleSelectUser = (name: string, userName: string) => {
    setGetRepoQueryVariables({ userName, first: config.limit });
    setSelectedUser({ name, userName });
  }

  const handleUserNav = (limit: { first?: number, last?: number, after?: string, before?: string }) => {
    setGetUserQueryVariables({
      ...limit,
      searchText: getUserQueryVariables.searchText
    });
    setSelectedUser({ name: '', userName: '' });
  }

  const handleRepoNav = (limit: { first?: number, last?: number, after?: string, before?: string }) => {
    setGetRepoQueryVariables({
      ...limit,
      userName: selectedUser.userName
    });
  }

  const getUserListComponent = () => (
    <UserList
      variables={getUserQueryVariables}
      selectedUserName={selectedUser.userName}
      itemClick={handleSelectUser}
      fetchData={handleUserNav}
    />
  );

  const getRepositoryListComponent = () => (
    selectedUser.userName ?
      <RepositoryList
        variables={getRepoQueryVariables}
        selectedUserName={selectedUser.name}
        fetchData={handleRepoNav}
      />
      :
      <List
        className={classes.list}
        subheader={
          <ListSubheader component="div" id="repo-list-header">
            No User Selected
          </ListSubheader>
        }
      />
  );

  return (
    <Grid className={classes.root}>
      <Search handleButtonClick={handleSearchChange} />
      <Grid className={classes.content} container justify="center">
        {getUserListComponent()}
        <Divider orientation="vertical" flexItem />
        {getRepositoryListComponent()}
      </Grid>
    </Grid>
  );
}

export default Home;
