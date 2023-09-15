import { Block, HStack, Loader, StackItem } from '@lidofinance/lido-ui';
import styled, { css } from 'styled-components';

import { Filter } from 'common/controls';
import { WalletCard, WalletCardRow } from 'common/wallets';

const darkBg = css`
  background: #34343d;
`;

export const WalletCardStyle = styled(WalletCard)`
  ${darkBg};
`;

export const WalletFilterRowStyle = styled(WalletCardRow)`
  height: 2.4rem;
  align-items: center;
`;

export const StyledLoader = styled(Loader)`
  margin-left: ${({ theme }) => theme.spaceMap.md}px;
`;

export const LidoIngoHeading = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spaceMap.xl}px;

  > p + p {
    margin-top: ${({ theme }) => theme.spaceMap.sm}px;
  }
`;

export const LidoInfoItem = styled(StackItem)`
  display: flex;
`;

export const LidoInfoBlock = styled(Block)`
  flex-grow: 1;

  padding: 12px ${({ theme }) => theme.spaceMap.xl}px;
  margin-bottom: ${({ theme }) => theme.spaceMap.lg}px;

  > p + p {
    margin-top: ${({ theme }) => theme.spaceMap.xs}px;
  }
`;

export const LidoInfoWrapper = styled(Block)`
  margin-top: ${({ theme }) => theme.spaceMap.xxl}px;
`;

export const DarkFilter = styled(Filter)`
  background: ${({ theme }) => theme.colors.accentDarken};
  border: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.accentContrast};

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.accentContrast};
    background: ${({ theme }) => theme.colors.accentDarken};
    border: ${({ theme }) => theme.colors.borderHover};
  }
`;

export const HighlightedStyle = styled.span`
  color: ${({ theme }) => theme.colors.success};
`;

export const InputFiltersStyle = styled(HStack)`
  margin-bottom: ${({ theme }) => theme.spaceMap.xxl}px;
`;
