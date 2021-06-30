import React, { FC, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

interface PropsType {
  setSearchText: (text: string) => void;
};

const Search: FC<PropsType> = ({ setSearchText }) => {
  const [search, setSearch] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="search-container">
      <TextField
        id="search-field"
        label="search field"
        value={search}
        variant="outlined"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSearchText(search)}
      >
        Search
      </Button>
    </div>
  );
}

export default Search;
