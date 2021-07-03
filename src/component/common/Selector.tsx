import React, { FC } from 'react';
import { Select, MenuItem } from '@material-ui/core';

interface PropsType {
  numberOfItems: number,
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void
}

const Selector: FC<PropsType> = ({ numberOfItems, handleChange}) => {
  return (
    <Select
      id="number-of-items-selector"
      value={numberOfItems}
      onChange={handleChange}
      label="Number of Items"
    >
      <MenuItem value={10}>10</MenuItem>
      <MenuItem value={25}>25</MenuItem>
      <MenuItem value={50}>50</MenuItem>
    </Select>
  );
}

export default Selector;