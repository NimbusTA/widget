import styled from 'styled-components';

import { WalletCard } from 'common/wallets';

export const WalletCardStyle = styled(WalletCard)`
  background: linear-gradient(52deg, #422978 0%, #b88f2c 100%);
`;

export const WalletDividerStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
  flex-grow: 0;
  border-top: 1px solid rgb(255, 255, 255, 0.1);
  width: 100%;
  height: 0;
`;
