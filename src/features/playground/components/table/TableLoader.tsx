import { InlineLoader, Td, Tr, Tbody } from '@lidofinance/lido-ui';
import React, { FC } from 'react';

const LoadingTableTd = () => (
  <Td>
    <InlineLoader />
  </Td>
);

const LoadingTableTr = () => (
  <Tr>
    <LoadingTableTd />
    <LoadingTableTd />
    <LoadingTableTd />
    <LoadingTableTd />
    <LoadingTableTd />
    <LoadingTableTd />
  </Tr>
);

export const TableLoader: FC = () => (
  <Tbody>
    <LoadingTableTr />
    <LoadingTableTr />
    <LoadingTableTr />
  </Tbody>
);
