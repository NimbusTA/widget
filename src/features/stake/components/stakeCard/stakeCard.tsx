import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { useEthereumBalance, useSDK } from '@lido-sdk/react';
import { Block, Button } from '@lidofinance/lido-ui';

import { useRouter } from 'next/router';
import React, { FC, useCallback, useMemo } from 'react';

import styled from 'styled-components';

import { CardData, CardDataRow } from 'components/cardData';
import FormatToken from 'components/formatToken';
import { TokenIcon } from 'components/tokenIcon';
import TokenInput from 'components/tokenInput';
import { STAGE, TxModal } from 'components/txModal';

import { WalletConnectButtonParachain } from 'common/wallets';

import {
  TOKENS,
  liquidToken,
  parachainToken,
  xcToken,
  PARACHAIN_DECIMALS,
  MIN_DEPOSIT,
  COMMON_ERRORS,
  getTokenAddress,
  getTokenIcon,
} from 'config';

import {
  useLiquidDecimals,
  useXcTokenBalance,
  useXcTokenDecimals,
} from 'contracts';

import {
  useTxCost,
  useTxPrice,
  useCurrencyInput,
  useMultipliedExchangeRate,
} from 'hooks';

import { useError } from 'utils';

import { RECEIVE_STAKE_TOOLTIP, REWARDS_HELPER_TEXT } from '../../constants';
import {
  useEstimateStake,
  useStakeExchangeRate,
  useStake,
  useXcTokenEstimateApprove,
} from '../../hooks';
import { ApproveButton } from '../approveButton';
import { StakeWallet } from '../stakeWallet';

interface StakeCardProps {}

const TokenInputStyled = styled(TokenInput)`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;

const approveCheckers = [
  {
    condition: (value: BigNumber) => !value.gt(Zero),
    message: COMMON_ERRORS.zeroAmount,
  },
];

const XCTokenIcon = getTokenIcon(TOKENS.xcToken);
const LiquidAddress = getTokenAddress(TOKENS.liquidToken);

export const StakeCard: FC<StakeCardProps> = () => {
  const { account } = useSDK();
  const xcTokenBalance = useXcTokenBalance();
  const xcTokenDecimals = useXcTokenDecimals();
  const liquidDecimals = useLiquidDecimals();

  const parachainTokenBalance = useEthereumBalance();

  const maxValue = xcTokenBalance?.data;

  const dataLoading =
    xcTokenDecimals.loading ||
    xcTokenBalance.loading ||
    liquidDecimals.loading ||
    parachainTokenBalance.loading;

  const amountValidators = useMemo(
    () => [
      {
        condition: (v: BigNumber) => !v.gte(MIN_DEPOSIT),
        message: COMMON_ERRORS.lessThanMin,
      },
      {
        condition: (v: BigNumber) => !!maxValue && !v.lte(maxValue),
        message: COMMON_ERRORS.hasAvailableBalance,
      },
    ],
    [maxValue],
  );

  const router = useRouter();
  const { value, valueBn, handleInputChange, onChange, inputError, reset } =
    useCurrencyInput({
      initialValue: (router?.query?.amount as string) ?? undefined,
      shouldValidate: !dataLoading,
      validators: amountValidators,
    });

  const {
    transaction,
    approveTransaction,
    allowance,
    processing,
    approveProcessing,
    txHash,
    error,
    stage,
    onFinish,
    needsApprove,
    canProcess,
  } = useStake({ amount: valueBn });

  // Approve should be allowed for any amount greater than Zero
  // and sufficient balance for fees
  const inputApproveError = useError(valueBn, needsApprove, approveCheckers);

  const txApproveGas = useXcTokenEstimateApprove(
    LiquidAddress,
    !inputApproveError,
    valueBn,
  );

  const txStakeGas = useEstimateStake(valueBn, !inputError && !needsApprove);

  const txPrice = useTxPrice(
    needsApprove ? txApproveGas.data : txStakeGas.data,
  );
  const txCost = useTxCost(txPrice);

  const insufficientFeeCheckers = useMemo(
    () => [
      {
        condition: (v: BigNumber) => !!txPrice && !v.gte(txPrice),
        message: COMMON_ERRORS.hasAvailableFee,
      },
    ],
    [txPrice],
  );

  const insufficientFeeError = useError(
    parachainTokenBalance?.data,
    !!valueBn &&
      !parachainTokenBalance.loading &&
      !txStakeGas.loading &&
      !txApproveGas.loading,
    insufficientFeeCheckers,
  );

  const onMax = useCallback(
    () => onChange(maxValue || Zero),
    [maxValue, onChange],
  );

  const exchangeRate = useStakeExchangeRate();
  const stakedAmount = useMultipliedExchangeRate(valueBn, exchangeRate.data);

  const onCloseModal = useCallback(() => {
    if (stage === STAGE.STAKED) reset();
    onFinish?.();
  }, [onFinish, reset, stage]);

  return (
    <>
      <StakeWallet />
      <Block>
        <TokenInputStyled
          locked={!!account && needsApprove}
          onMax={maxValue && onMax}
          leftDecorator={
            <TokenIcon icon={XCTokenIcon} alt={`${xcToken} token icon`} />
          }
          value={value}
          onChange={handleInputChange}
          error={
            !dataLoading && needsApprove
              ? !approveProcessing &&
                (inputApproveError || insufficientFeeError)
              : !processing && (inputError || insufficientFeeError)
          }
        />
        {account && needsApprove && (
          <ApproveButton
            loading={approveProcessing || dataLoading}
            disabled={!!insufficientFeeError || !!inputApproveError}
            onClick={approveTransaction}
          >
            Unlock tokens to stake
          </ApproveButton>
        )}
        {account && !needsApprove && (
          <Button
            fullwidth
            loading={processing || dataLoading}
            disabled={
              !canProcess || !!inputError || !!insufficientFeeError || !value
            }
            onClick={transaction}
          >
            Stake
          </Button>
        )}
        {!account && <WalletConnectButtonParachain fullwidth />}
        <CardData>
          <CardDataRow
            loading={liquidDecimals.initialLoading}
            title="You will receive"
            help={RECEIVE_STAKE_TOOLTIP}
            value={
              liquidDecimals.data ? (
                <FormatToken
                  symbol={liquidToken}
                  decimals={liquidDecimals.data}
                  amount={stakedAmount}
                />
              ) : (
                '0.0'
              )
            }
          />
          <CardDataRow
            title="Exchange rate"
            loading={exchangeRate.loading}
            value={
              <>
                1 {xcToken}
                {exchangeRate && liquidDecimals.data ? (
                  <>
                    {' = '}
                    <FormatToken
                      symbol={liquidToken}
                      decimals={liquidDecimals.data}
                      amount={exchangeRate.data}
                    />
                  </>
                ) : (
                  <span> &asymp; 1 {liquidToken}</span>
                )}
              </>
            }
          />
          <CardDataRow
            highlight={!!insufficientFeeError}
            title={`${parachainToken} balance`}
            loading={parachainTokenBalance.initialLoading}
            value={
              <FormatToken
                amount={parachainTokenBalance.data}
                decimals={PARACHAIN_DECIMALS}
                symbol={parachainToken}
              />
            }
          />
          <CardDataRow
            title="Allowance"
            value={
              xcTokenDecimals.data && (
                <FormatToken
                  amount={allowance}
                  decimals={xcTokenDecimals.data}
                  symbol={xcToken}
                />
              )
            }
          />
          <CardDataRow
            title="Transaction cost"
            value={
              <>
                <FormatToken
                  amount={txPrice}
                  decimals={PARACHAIN_DECIMALS}
                  symbol={parachainToken}
                  maxDigits={5}
                  approx
                />
                {!!txCost && ` (${txCost})`}
              </>
            }
          />
          <CardDataRow
            title="Reward fee"
            value="10%"
            help={REWARDS_HELPER_TEXT}
          />
        </CardData>
      </Block>
      <TxModal
        open={(stage as STAGE) !== STAGE.IDLE}
        onClose={onCloseModal}
        onRetry={needsApprove ? approveTransaction : transaction}
        stage={stage}
        error={error as Error}
        txHash={txHash}
        amount={value}
        token={xcToken}
      />
    </>
  );
};
