import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { useSDK, useEthereumBalance } from '@lido-sdk/react';
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
  parachainToken,
  liquidToken,
  xcToken,
  PARACHAIN_DECIMALS,
  COMMON_ERRORS,
  getTokenIcon,
  TOKENS,
} from 'config';
import {
  useLiquidBalance,
  useLiquidDecimals,
  useXcTokenDecimals,
} from 'contracts';
import {
  useCurrencyInput,
  useMultipliedExchangeRate,
  useTxCost,
  useTxPrice,
} from 'hooks';

import { useError } from 'utils';

import {
  useEstimateUnstake,
  useUnstake,
  useUnstakeExchangeRate,
} from '../../hooks/';
import { UnstakeWallet } from '../unstakeWallet';

interface UnstakeCardProps {}

const LiquidTokenIcon = getTokenIcon(TOKENS.liquidToken);

const TokenInputStyled = styled(TokenInput)`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;

export const UnstakeCard: FC<UnstakeCardProps> = () => {
  const liquidBalance = useLiquidBalance();
  const liquidDecimals = useLiquidDecimals();
  const xcTokenDecimals = useXcTokenDecimals();

  const parachainTokenBalance = useEthereumBalance();

  const { account } = useSDK();

  const maxValue = liquidBalance?.data;

  const dataLoading =
    xcTokenDecimals.loading ||
    liquidDecimals.loading ||
    liquidBalance.loading ||
    parachainTokenBalance.loading;

  const amountValidators = useMemo(
    () => [
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
      initialValue: (router?.query?.amount as string) || undefined,
      shouldValidate: !dataLoading,
      validators: amountValidators,
    });

  const txGas = useEstimateUnstake(valueBn, !inputError);
  const txPrice = useTxPrice(txGas.data);
  const txCost = useTxCost(txPrice);

  const feeCheckers = useMemo(
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
    !!valueBn && !parachainTokenBalance.loading && !txGas.loading,
    feeCheckers,
  );

  const {
    transaction,
    canProcess,
    processing,
    txHash,
    onFinish,
    error,
    stage,
  } = useUnstake({ amount: valueBn });

  const onMax = useCallback(
    () => onChange(maxValue || Zero),
    [maxValue, onChange],
  );

  const onCloseModal = useCallback(() => {
    reset();
    onFinish?.();
  }, [onFinish, reset]);

  const exchangeRate = useUnstakeExchangeRate();
  const unstakedAmount = useMultipliedExchangeRate(valueBn, exchangeRate?.data);

  return (
    <>
      <UnstakeWallet />
      <Block>
        <TokenInputStyled
          onMax={maxValue && onMax}
          leftDecorator={
            <TokenIcon
              icon={LiquidTokenIcon}
              alt={`${liquidToken} token icon`}
            />
          }
          value={value}
          onChange={handleInputChange}
          error={
            !processing && !dataLoading && (inputError || insufficientFeeError)
          }
        />
        {account ? (
          <Button
            fullwidth
            loading={processing || dataLoading}
            disabled={!canProcess || !!inputError || !!insufficientFeeError}
            onClick={transaction}
          >
            Withdraw
          </Button>
        ) : (
          <WalletConnectButtonParachain fullwidth />
        )}
        <CardData>
          <CardDataRow
            loading={
              exchangeRate.initialLoading || liquidDecimals.initialLoading
            }
            title="You will receive"
            value={
              liquidDecimals.data ? (
                <FormatToken
                  symbol={liquidToken}
                  decimals={liquidDecimals.data}
                  amount={unstakedAmount}
                />
              ) : (
                '0.0'
              )
            }
          />
          <CardDataRow
            title="Exchange rate"
            loading={exchangeRate.initialLoading}
            value={
              <>
                1 {xcToken}
                {exchangeRate.data && liquidDecimals.data ? (
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
            title="Transaction cost"
            value={
              <>
                <FormatToken
                  amount={txPrice}
                  decimals={PARACHAIN_DECIMALS}
                  symbol={parachainToken}
                  approx
                />
                {txCost && ` (${txCost})`}
              </>
            }
          />
        </CardData>
      </Block>
      <TxModal
        open={(stage as STAGE) !== STAGE.IDLE}
        onClose={onCloseModal}
        onRetry={transaction}
        stage={stage}
        error={error as Error}
        txHash={txHash}
        amount={value}
        token={liquidToken}
      />
    </>
  );
};
