import { useSDK } from '@lido-sdk/react';
import { useWeb3 } from '@lido-sdk/web3-react';
import { Divider, Question, Tooltip } from '@lidofinance/lido-ui';

import FormatToken from 'components/formatToken';

import {
  WalletCardBalance,
  WalletCardRow,
  AccountRowParachain,
  FallbackWalletParachain,
  TokenToWallet,
} from 'common/wallets';

import { DEFAULT_VALUE, getTokenAddress, TOKENS } from 'config';

import { liquidToken } from 'config';
import {
  useLiquidBalance,
  useLiquidDecimals,
  useXcTokenBalance,
} from 'contracts';
import { formatAPR, useAPR, useStatistics } from 'hooks';

import { HighlightedStyle, WalletCardStyle } from './stakeWalletStyles';
import { WalletComponent } from './types';

const liquidAddress = getTokenAddress(TOKENS.liquidToken);
const xcAddress = getTokenAddress(TOKENS.xcToken);

const StakeWalletComponent: WalletComponent = (props) => {
  const liquidBalance = useLiquidBalance();
  const liquidDecimals = useLiquidDecimals();

  const xcTokenBalance = useXcTokenBalance();

  const apr = useAPR();
  const statistics = useStatistics();
  const estimatedAPY = statistics?.data?.estimatedAPY;

  return (
    <WalletCardStyle {...props}>
      <AccountRowParachain
        title="Available to stake"
        balance={xcTokenBalance}
        tokenAddress={xcAddress}
      />
      <Divider />
      <WalletCardRow>
        <WalletCardBalance
          small
          title="Staked Amount"
          loading={
            liquidBalance.initialLoading || liquidDecimals.initialLoading
          }
          value={
            liquidDecimals.data && (
              <>
                <FormatToken
                  minimize
                  amount={liquidBalance.data}
                  symbol={liquidToken}
                  decimals={liquidDecimals.data}
                />
                <TokenToWallet address={liquidAddress} />
              </>
            )
          }
        />
        <WalletCardBalance
          small
          title={
            <>
              Nimbus APR{' '}
              <Tooltip
                placement="bottom"
                title={
                  <>
                    <Divider indents="sm" />
                    Estimated APY based on the Polkadot reward distribution
                    model = {formatAPR(estimatedAPY)}
                  </>
                }
              >
                <Question />
              </Tooltip>
            </>
          }
          value={
            apr === DEFAULT_VALUE ? (
              apr
            ) : (
              <HighlightedStyle>{formatAPR(apr)}</HighlightedStyle>
            )
          }
        />
      </WalletCardRow>
    </WalletCardStyle>
  );
};

export const StakeWallet: WalletComponent = (props) => {
  const { active } = useWeb3();
  const { account } = useSDK();
  return active && !!account ? (
    <StakeWalletComponent {...props} />
  ) : (
    <FallbackWalletParachain {...props} />
  );
};
