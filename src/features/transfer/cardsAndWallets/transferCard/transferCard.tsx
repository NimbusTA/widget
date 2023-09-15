import { useSDK } from '@lido-sdk/react';
import { Block } from '@lidofinance/lido-ui';

import { FC } from 'react';
import styled from 'styled-components';

import { WalletConnectButtonParachain } from 'common/wallets';

import { useSubstrate } from 'features/transfer';
import TransferWallet from 'features/transfer/cardsAndWallets/transferWallet';
import WalletConnectButtonSubstrate from 'features/transfer/components/walletConnectButtonSubstrate';

import { DownwardTransfer } from './downwardTransfer';
import { ReversedTransfer } from './upwardTransfer';

interface TransferCardProps {
  reversed: boolean;
}

const Delimiter = styled.div`
  margin-bottom: 20px;
`;

const TransferCard: FC<TransferCardProps> = ({ reversed }) => {
  const { selectedAccount: dotAccount } = useSubstrate();
  const { account: evmAccount } = useSDK();

  const active = !!dotAccount && !!evmAccount;

  return (
    <>
      <TransferWallet reversed={reversed} />
      <Block>
        {active && reversed ? (
          <ReversedTransfer />
        ) : (
          active && <DownwardTransfer />
        )}
        {!evmAccount && <WalletConnectButtonParachain fullwidth />}
        {!evmAccount && !dotAccount && <Delimiter />}
        {!dotAccount && <WalletConnectButtonSubstrate fullwidth />}
      </Block>
    </>
  );
};

export default TransferCard;
