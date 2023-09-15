import { Zero } from '@ethersproject/constants';

import { useSDK, useEthereumBalance } from '@lido-sdk/react';
import { useWeb3 } from '@lido-sdk/web3-react';
import { Divider, Button } from '@lidofinance/lido-ui';

import { useState } from 'react';

import FormatToken from 'components/formatToken';

import { STAGE, TxModal } from 'components/txModal';

import { ErrorModal } from 'common/layout';

import {
  AccountRowParachain,
  FallbackWalletParachain,
  TokenToWallet,
  WalletCardBalance,
  WalletCardRow,
} from 'common/wallets';

import { TOKENS, parachainName, getTokenAddress } from 'config';

import { liquidToken, parachainToken, xcToken } from 'config';
import {
  useLiquidBalance,
  useLiquidDecimals,
  useLiquidUnbonding,
  useXcTokenBalance,
  useXcTokenDecimals,
} from 'contracts';
import { useTxPrice } from 'hooks';

import { formatBalance } from 'utils';

import { WalletComponent } from './types';
import { WalletCardStyle } from './unstakeWalletStyles';
import { useClaim, useEstimateClaim } from '../../hooks';

const liquidAddress = getTokenAddress(TOKENS.liquidToken);
const xcAddress = getTokenAddress(TOKENS.xcToken);

const UnstakeWalletComponent: WalletComponent = (props) => {
  const liquid = useLiquidBalance();
  const xcTokenBalance = useXcTokenBalance();
  const xcTokenDecimals = useXcTokenDecimals();
  const liquidDecimals = useLiquidDecimals();

  const unbonding = useLiquidUnbonding();
  const [waitingUnbonding, claimingUnbonding] = unbonding?.data || [Zero, Zero];

  const parachainTokenBalance = useEthereumBalance();
  const txGas = useEstimateClaim(
    claimingUnbonding,
    !!claimingUnbonding?.gt(Zero),
  );
  const txPrice = useTxPrice(txGas.data);

  const hasAvailableFee =
    !!txPrice && !!parachainTokenBalance?.data?.gte(txPrice);
  const hasAvailableToClaim = !!claimingUnbonding?.gt(Zero);

  const {
    transaction,
    canProcess,
    processing,
    txHash,
    onFinish,
    error,
    stage,
  } = useClaim();

  const [claimErrorModalOpen, setClaimErrorModal] = useState(false);
  const onClaimModalError = () => {
    setClaimErrorModal(true);
  };

  // TODO: add estimate time
  // const estimatedTime = useEstimatedTime();

  return (
    <>
      <WalletCardStyle {...props}>
        <WalletCardRow>
          <WalletCardBalance
            small
            title="Staked Amount"
            loading={liquid.initialLoading || liquidDecimals.initialLoading}
            value={
              liquidDecimals.data && (
                <>
                  <FormatToken
                    minimize
                    amount={liquid.data}
                    symbol={liquidToken}
                    decimals={liquidDecimals.data}
                  />
                  <TokenToWallet address={liquidAddress} />
                </>
              )
            }
          />
          {/*{estimatedTime.isSuccess && !!estimatedTime.data && (*/}
          {/*  <WalletCardBalance*/}
          {/*    small*/}
          {/*    title="Estimated time"*/}
          {/*    value={formatHoursToDaysString(estimatedTime.data)}*/}
          {/*  />*/}
          {/*)}*/}
          <div>
            <WalletCardBalance
              small
              title="Waiting for unbonding"
              loading={
                unbonding.initialLoading || xcTokenDecimals.initialLoading
              }
              value={
                xcTokenDecimals.data && (
                  <FormatToken
                    minimize
                    amount={waitingUnbonding}
                    symbol={xcToken}
                    decimals={xcTokenDecimals.data}
                  />
                )
              }
            />
          </div>
        </WalletCardRow>
        <Divider />
        <WalletCardRow>
          <WalletCardBalance
            small
            title="Available for claiming"
            loading={unbonding.initialLoading}
            value={
              xcTokenDecimals.data && (
                <FormatToken
                  minimize
                  amount={claimingUnbonding}
                  symbol={xcToken}
                  decimals={xcTokenDecimals.data}
                />
              )
            }
          />
          <Button
            disabled={!hasAvailableToClaim || !canProcess}
            loading={processing}
            onClick={hasAvailableFee ? transaction : onClaimModalError}
          >
            Claim
          </Button>
        </WalletCardRow>
        <Divider />
        <AccountRowParachain
          title={`${parachainName} balance`}
          balance={xcTokenBalance}
          tokenAddress={xcAddress}
        />
      </WalletCardStyle>
      <TxModal
        open={(stage as STAGE) !== STAGE.IDLE}
        onClose={onFinish}
        onRetry={transaction}
        stage={stage}
        error={error as Error}
        txHash={txHash}
        amount={formatBalance({
          balance: claimingUnbonding,
          decimals: xcTokenDecimals.data,
        })}
        token={xcToken}
      />
      <ErrorModal
        open={claimErrorModalOpen}
        onClose={() => setClaimErrorModal(false)}
        message={`Not enough ${parachainToken} to complete transaction.`}
      />
    </>
  );
};

export const UnstakeWallet: WalletComponent = (props) => {
  const { account } = useSDK();
  const { active } = useWeb3();

  return active && !!account ? (
    <UnstakeWalletComponent {...props} />
  ) : (
    <FallbackWalletParachain {...props} />
  );
};
