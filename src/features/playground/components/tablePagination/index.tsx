import { Pagination, PaginationProps } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { PaginationWrapperStyle } from './styles';

export const TablePagination: FC<PaginationProps> = (props) => {
  return (
    <PaginationWrapperStyle>
      <Pagination {...props} />
    </PaginationWrapperStyle>
  );
};
