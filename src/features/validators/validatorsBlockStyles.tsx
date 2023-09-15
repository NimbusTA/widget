import {
  Block,
  Table,
  Th,
  Td,
  Text,
  Tooltip,
  Button,
  StackItem,
  HStack,
} from '@lidofinance/lido-ui';
import styled from 'styled-components';

import { ValidatorLinkProps } from './types';

export const ValidatorsHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 36px 0 28px 0;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
    align-items: start;
    justify-content: start;

    padding: ${({ theme }) => theme.spaceMap.lg}px 0;

    > p {
      margin-bottom: ${({ theme }) => theme.spaceMap.lg}px;
    }
  }
`;

export const ValidatorsLinkLeftWrapper = styled.div`
  margin-left: -${({ theme }) => theme.spaceMap.xs}px;
  margin-top: -${({ theme }) => theme.spaceMap.xs}px;
`;

export const ValidatorsLinkRightWrapper = styled.div`
  margin-right: -${({ theme }) => theme.spaceMap.xs}px;
`;

export const ValidatorsTooltip = styled(Tooltip)`
  max-width: 400px !important;
`;

export const ValidatorsMobileRow = styled(HStack)`
  margin: 0 -${({ theme }) => theme.spaceMap.lg}px;
  padding: ${({ theme }) => theme.spaceMap.lg}px;

  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};

  > div > * + * {
    margin-top: 1px;
  }
`;

export const ValidatorsMobileSecondColumn = styled(StackItem)`
  text-align: right;
`;

export const ValidatorsButton = styled(Button)`
  &::before {
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  &:disabled {
    opacity: 1;

    > span {
      opacity: 0.5;
    }
  }
`;

export const ValidatorsWrapper = styled(Block)`
  overflow: hidden;
  padding-top: 0;
  max-width: 800px;
  margin: auto;
`;

export const ValidatorsTableContainer = styled.div`
  margin: -1px -32px 16px -32px;

  td {
    vertical-align: top;
  }
`;

export const ValidatorsTable = styled(Table)`
  table-layout: fixed;
`;

export const ValidatorsTh = styled(Th)`
  vertical-align: top;
  padding-top: ${({ theme }) => theme.spaceMap.sm}px;
`;

export const ValidatorsTd = styled(Td)`
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const FakeTableRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
  }

  padding-top: ${({ theme }) => theme.spaceMap.xl}px;

  > * + * {
    margin-top: ${({ theme }) => theme.spaceMap.sm}px;
  }
`;

export const BalanceData = styled.div`
  margin-left: auto;
  margin-right: 0;

  color: ${({ theme }) => theme.colors.success};
`;

export const StyledValidatorsLink = styled.a<
  Pick<ValidatorLinkProps, 'fullInfo'>
>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 50px;
  padding: 6px ${({ fullInfo }) => (fullInfo ? 8 : 6)}px;
  margin: ${({ theme }) => theme.spaceMap.xs}px;

  text-decoration: none;

  > div {
    cursor: pointer;
  }
`;

export const ValidatorsText = styled(Text)`
  margin-left: 6px;
`;

export const ValidatorsLinkWrapper = styled.div`
  margin-top: -4px;
  margin-left: -4px;
`;
