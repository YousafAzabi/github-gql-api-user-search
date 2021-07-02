import React, { FC, useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

interface PropsType {
  setSearchText: (text: string) => void,
  classes: ClassNameMap
};

const Search: FC<PropsType> = ({ classes, setSearchText }) => {
  const [search, setSearch] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Grid container justify="center" alignItems="center">
      <TextField
        className={classes.search}
        id="search-field"
        label="search field"
        value={search}
        variant="outlined"
        size="small"
        onChange={handleChange}
      />
      <div className={classes.search}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setSearchText(search)}
        >
          Search
        </Button>
      </div>
    </Grid>
  );
}

export default Search;
