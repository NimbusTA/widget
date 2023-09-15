import { DataTable } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const DataTableStyle = styled(DataTable)`
  margin-top: ${({ theme }) => theme.spaceMap.xxl}px;
`;

export const DataTableValueStyle = styled.div<{ highlight?: boolean }>`
  white-space: nowrap;
  color: ${({ theme, highlight }) =>
    highlight ? theme.colors.error : 'inherit'};
`;
