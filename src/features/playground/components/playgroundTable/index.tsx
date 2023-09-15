import { Tbody } from '@lidofinance/lido-ui';
import { FC, useRef } from 'react';

import { usePagination, useTable } from 'react-table';

import { PLAYGROUND_TABLE_COLUMNS, PLAYGROUND_TABLE_CONFIG } from './constants';
import { TableStyle, TableWrapperStyle } from './styles';
import { TableDefaultError, TableEmptyError } from './TableErrors';
import { TableProps } from './types';
import { PlaygroundData } from '../../types';
import { TableHeader, TableLoader, TableRow } from '../table';
import { TablePagination } from '../tablePagination';

const columns = PLAYGROUND_TABLE_COLUMNS.map((key) => ({
  accessor: key,
}));

export const TableBody: FC<{ page: any }> = ({ page }) => (
  <>
    {!page?.length ? (
      <TableEmptyError />
    ) : (
      <Tbody>
        {page?.map((row: { original: PlaygroundData }, index: number) => {
          const day = row.original;
          return (
            <TableRow
              key={index}
              columns={PLAYGROUND_TABLE_CONFIG.columnsOrder}
              data={day}
              config={PLAYGROUND_TABLE_CONFIG.columnsConfig}
            />
          );
        })}
      </Tbody>
    )}
  </>
);

const PlaygroundTable: FC<TableProps> = (props) => {
  const { data, pending, error, onRefresh } = props;

  const tableRef = useRef<HTMLElement>(null);

  // TODO: Fix useTable typings and rid of `any`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableInstance: any = useTable<PlaygroundData>(
    {
      columns,
      data,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initialState: {
        pageIndex: 0,
        pageSize: PLAYGROUND_TABLE_CONFIG.take,
      } as any,
    },
    usePagination,
  );

  const {
    page,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = tableInstance;

  const changePage = (page: number) => {
    gotoPage(page);
    if (pageIndex === pageCount - 1 || page === pageCount - 1) {
      tableRef.current?.scrollIntoView();
    }
  };

  return (
    <>
      <TableWrapperStyle>
        <TableStyle>
          <TableHeader
            columns={PLAYGROUND_TABLE_CONFIG.columnsOrder}
            config={PLAYGROUND_TABLE_CONFIG.columnsConfig}
          />

          {pending && <TableLoader />}
          {!pending && error && <TableDefaultError onRefresh={onRefresh} />}
          {!pending && !error && <TableBody page={page} />}
        </TableStyle>
      </TableWrapperStyle>
      {!pending && (
        <TablePagination
          pagesCount={pageCount}
          onItemClick={(currentPage: number) => changePage(currentPage - 1)}
          activePage={pageIndex + 1}
          siblingCount={2}
        />
      )}
    </>
  );
};

export default PlaygroundTable;
