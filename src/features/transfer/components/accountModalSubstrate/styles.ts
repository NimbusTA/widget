import { Button, ButtonIcon } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const SubstrateModalAccountStyle = styled.div`
  display: flex;
  align-items: center;
`;

export const SubstrateAccountButtonStyle = styled(Button)`
  &:disabled {
    opacity: 1;
  }
`;

export const SubstrateAccountAddressStyle = styled.div`
  margin-left: ${({ theme }) => theme.spaceMap.sm}px;
  font-size: ${({ theme }) => theme.fontSizesMap.xs}px;
  line-height: 1.2em;
  font-weight: normal;
`;

export const SubstrateWalletCopyButton = styled(ButtonIcon)`
  position: absolute;
  right: ${({ theme }) => theme.spaceMap.sm}px;
  bottom: 10px;
`;

export const SubstrateAccountItemStyle = styled.div`
  position: relative;
`;
