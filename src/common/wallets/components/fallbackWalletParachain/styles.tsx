import { Button } from '@lidofinance/lido-ui';
import styled from 'styled-components';

import { WalletCard } from '../walletCard';

export const FallbackWalletStyle = styled(WalletCard)`
  text-align: center;
  background: ${({ theme }) => theme.colors.error};
  background-image: none !important;
`;

export const ConnectButtonStyle = styled(Button)`
  margin-top: ${({ theme }) => theme.spaceMap.md}px;
  background-color: #e06b6b;

  &:not(:disabled):hover {
    background-color: #a23232;
  }
`;
