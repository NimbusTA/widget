import { Button, Text } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const PaginationItem = styled(Button)`
  margin: ${({ theme }) => theme.spaceMap.sm}px;
  padding: ${({ theme }) => theme.spaceMap.xs}px;
  font-size: ${({ theme }) => theme.fontSizesMap.xxs}px;

  &::before {
    border: 1px solid rgba(0, 10, 61, 0.12);
  }

  &:disabled {
    opacity: 1;

    > span {
      opacity: 0.5;
    }
  }
  min-width: 32px;
`;

export const PaginationText = styled(Text)`
  margin: auto ${({ theme }) => theme.spaceMap.sm}px;
`;
