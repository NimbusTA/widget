import styled from 'styled-components';

import { WalletCard } from 'common/wallets';

export const WalletCardStyle = styled(WalletCard)`
  background: linear-gradient(220deg, #404fe5 0%, #080b18 100%);
`;

export const HighlightedStyle = styled.span`
  color: ${({ theme }) => theme.colors.success};
`;
