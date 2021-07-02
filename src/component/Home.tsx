import React, { useState } from 'react';
import { Divider, Grid, List, ListSubheader } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Search from './Search';
import UserList from './UserList';
import RepositoryList from './RepositoryList';

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
    },
    search: {
      width: '45%',
      maxWidth: 360,
      margin: theme.spacing(1)
    },
    nav: {
      width: '100%',
      bottom: theme.spacing(1),
      marginTop: theme.spacing(2)
    },
    previous: {
      float: 'left',
      marginLeft: theme.spacing(1)
    },
    next : {
      float: 'right',
      marginRight: theme.spacing(1)
    }
  })
);

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] =useState({name: '', userName: ''});

  const classes = useStyles();

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    setSelectedUser({name: '', userName: ''});
  }

  const getUserListComponent = () => (
    <UserList
      classes={classes}
      searchText={searchText}
      selectedUserName={selectedUser.userName}
      clickItem={(name: string, userName: string) => setSelectedUser({name, userName})}
    />
  );

  const getRepositoryListComponent = () => (
    selectedUser.userName ?
      <RepositoryList classes={classes} selectedUser={selectedUser} />
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
      <Search classes={classes} setSearchText={handleSearchChange} />
      <Grid container justify="center">
        {getUserListComponent()}
        <Divider orientation="vertical" flexItem />
        {getRepositoryListComponent()}
      </Grid>
    </Grid>
  );
}

export default Home;
