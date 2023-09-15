import { Table, Td } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const TableWrapperStyle = styled.div`
  position: relative;
  width: calc(100% + ${({ theme }) => 2 * theme.spaceMap.xxl}px);
  margin: 0 ${({ theme }) => -theme.spaceMap.xxl}px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: calc(100% + ${({ theme }) => 2 * theme.spaceMap.lg}px);
    margin: 0 ${({ theme }) => -theme.spaceMap.lg}px;
    overflow-x: auto;
  }
`;

export const TableStyle = styled(Table)`
  width: 100%;
`;

export const TableEmptyWrapper = styled.div`
  text-align: center;
`;

export const TableErrorTd = styled(Td)`
  border: none;
`;
