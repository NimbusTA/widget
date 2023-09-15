import React, { FC } from 'react';

import ListHeading from './ListHeading';

import { PlaygroundListProps } from './types';
import PlaygroundTable from '../playgroundTable';

const PlaygroundList: FC<PlaygroundListProps> = (props) => {
  const { data, error, onRefresh, pending } = props;

  return (
    <>
      <ListHeading />
      <PlaygroundTable
        error={error}
        onRefresh={onRefresh}
        data={data}
        pending={pending}
      />
    </>
  );
};

export default PlaygroundList;
