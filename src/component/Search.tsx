import React, { FC, useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      width: '45%',
      maxWidth: 360,
      margin: theme.spacing(1)
    }
  })
);
interface PropsType {
  handleButtonClick: (text: string) => void
};

const Search: FC<PropsType> = ({ handleButtonClick }) => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <Grid container justify="center" alignItems="center">
      <TextField
        className={classes.search}
        id="search-field"
        label="search field"
        value={searchText}
        variant="outlined"
        size="small"
        onChange={handleSearchChange}
      />
      <div className={classes.search}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick(searchText)}
        >
          Search
        </Button>
      </div>
    </Grid>
  );
}

export default Search;
