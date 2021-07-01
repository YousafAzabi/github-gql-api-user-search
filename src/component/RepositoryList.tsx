import React, { FC } from 'react';

interface PropsType {
  selectedUser: string
}

const RepositoryList: FC<PropsType> = ({ selectedUser }) => {
  return (
    <div>
      {selectedUser}
    </div>
  );
}

export default RepositoryList;