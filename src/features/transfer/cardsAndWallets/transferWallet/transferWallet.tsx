import { useSDK } from '@lido-sdk/react';
import { Divider } from '@lidofinance/lido-ui';

import { FC } from 'react';

import { FallbackWalletParachain, AccountRowParachain } from 'common/wallets';

import { getTokenAddress, parachainName, relayChainName, TOKENS } from 'config';
import { useXcTokenBalance } from 'contracts';
import { isAccountEmpty, useSubstrate } from 'features/transfer';
import AccountRowSubstrate from 'features/transfer/components/accountRowSubstrate';
import FallbackWalletSubstrate from 'features/transfer/components/fallbackWalletSubstrate';

import { WalletCardStyle } from './transferWalletStyles';
import { TransferWalletComponent } from './types';

const Prefix: FC<{ prefix: string; chainName: string }> = ({
  prefix,
  chainName,
}) => (
  <span>
    <strong>{prefix}: </strong>
    {chainName}
  </span>
);

const tokenAddress = getTokenAddress(TOKENS.xcToken);

// TODO: make this more clear
const TransferWallet: TransferWalletComponent = ({ reversed }) => {
  const { account: evmAccount } = useSDK();
  const { selectedAccount } = useSubstrate();
  const isAccountSubstrate = !isAccountEmpty(selectedAccount);
  const balance = useXcTokenBalance();

  return (
    <WalletCardStyle>
      {reversed ? (
        <>
          {!!evmAccount && (
            <AccountRowParachain
              title={<Prefix prefix="From" chainName={parachainName} />}
              balance={balance}
              tokenAddress={tokenAddress}
            />
          )}
        </>
      ) : (
        <>
          {isAccountSubstrate && (
            <AccountRowSubstrate
              title={<Prefix prefix="From" chainName={relayChainName} />}
            />
          )}
        </>
      )}
      {evmAccount && isAccountSubstrate && <Divider />}
      {reversed ? (
        <>
          {isAccountSubstrate && (
            <AccountRowSubstrate
              title={<Prefix prefix="To" chainName={relayChainName} />}
            />
          )}
        </>
      ) : (
        <>
          {!!evmAccount && (
            <AccountRowParachain
              title={<Prefix prefix="To" chainName={parachainName} />}
              balance={balance}
              tokenAddress={tokenAddress}
            />
          )}
        </>
      )}
    </WalletCardStyle>
  );
};

const TransferWalletWrapper: TransferWalletComponent = (props) => {
  const { reversed } = props;
  const { account: evmAccount } = useSDK();
  const { selectedAccount } = useSubstrate();
  const isAccountSubstrate = !isAccountEmpty(selectedAccount);

  return (
    <>
      {reversed && !evmAccount && <FallbackWalletParachain />}
      {!reversed && !isAccountSubstrate && <FallbackWalletSubstrate />}
      {(isAccountSubstrate || evmAccount) && <TransferWallet {...props} />}
      {reversed && !isAccountSubstrate && <FallbackWalletSubstrate />}
      {!reversed && !evmAccount && <FallbackWalletParachain />}
    </>
  );
};

export default TransferWalletWrapper;
