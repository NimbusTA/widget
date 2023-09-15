import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { useSDK } from '@lido-sdk/react';
import { Button, Tooltip } from '@lidofinance/lido-ui';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useMemo } from 'react';

import { CardData, CardDataRow } from 'components/cardData';
import FormatToken from 'components/formatToken';
import MaxButton from 'components/maxButton';
import { TokenIcon } from 'components/tokenIcon';

import {
  COMMON_ERRORS,
  downwardParachainFee,
  EXISTENTIAL_DEPOSIT_WARNING,
  getTokenIcon,
  nativeToken,
  relayTransactionFee,
  TOKENS,
  xcToken,
} from 'config';
import { useXcTokenBalance, useXcTokenDecimals } from 'contracts';

import {
  PARACHAIN_TELEPORT_ID,
  useDirectTransfer,
  useSubstrate,
  useSubstrateBalance,
} from 'features/transfer';
import { STAGE, TxModal } from 'features/transfer/components/txModal';
import { useCurrencyInput, useTxCost } from 'hooks';

import { formatBalance } from 'utils';

import { TokenInputStyled, WarningIconStyled } from './transferCardStyles';
import { TransferComponentProps } from './types';

const nativeTokenIcon = getTokenIcon(TOKENS.nativeToken);

export const DownwardTransfer: FC<TransferComponentProps> = () => {
  const xcTokenBalance = useXcTokenBalance();
  const xcTokenDecimals = useXcTokenDecimals();

  const { data: balance, loading: balanceLoading } = useSubstrateBalance();

  const dataLoading =
    xcTokenDecimals.loading || xcTokenBalance.loading || balanceLoading;

  const [defaultRelayFee, parachainFee, fee, maxValue] = useMemo(() => {
    const defaultRelayFee = BigNumber.from(relayTransactionFee);
    const parachainFee = BigNumber.from(downwardParachainFee);
    const fee = defaultRelayFee.add(parachainFee);
    const maxValue: BigNumber =
      (balance && fee && balance.gte(fee) && balance.sub(fee)) || Zero;
    return [defaultRelayFee, parachainFee, fee, maxValue];
  }, [balance]);

  const amountValidators = useMemo(
    () => [
      {
        condition: (v: BigNumber) => !!fee && !v.gt(defaultRelayFee),
        message: `${COMMON_ERRORS.lessThanMin}, minimal amount: ${formatBalance(
          {
            balance: defaultRelayFee,
            maxDecimalDigits: 5,
            decimals: xcTokenDecimals.data,
          },
        )}`,
      },
      {
        condition: (v: BigNumber) => !!fee && !v.gte(fee),
        message: COMMON_ERRORS.hasAvailableFee,
      },
      {
        condition: (v: BigNumber) => !!maxValue && !v.lte(maxValue),
        message: `${COMMON_ERRORS.hasAvailableBalance}: ${formatBalance({
          balance: maxValue,
          maxDecimalDigits: 5,
          decimals: xcTokenDecimals.data,
        })}`,
      },
    ],
    [defaultRelayFee, fee, maxValue, xcTokenDecimals.data],
  );

  const router = useRouter();
  const { value, valueBn, handleInputChange, onChange, inputError, reset } =
    useCurrencyInput({
      initialValue: (router?.query?.amount as string) || undefined,
      shouldValidate: !dataLoading,
      validators: amountValidators,
    });

  const { account: parachainAccount } = useSDK();
  const { selectedAccount: substrateAccount } = useSubstrate();

  const updateBalance = useCallback(
    () => xcTokenBalance.update(),
    [xcTokenBalance],
  );

  const { transaction, processing, onFinish, canProcess, error, stage } =
    useDirectTransfer({
      sender: substrateAccount,
      receiver: parachainAccount,
      amount: valueBn,
      onSuccess: updateBalance,
    });

  const disabled =
    !canProcess ||
    !parachainAccount ||
    !valueBn ||
    !PARACHAIN_TELEPORT_ID ||
    !!inputError;

  const txCost = useTxCost(BigNumber.from(fee.toString()), nativeToken);

  const hasExistentialBalance = useMemo(() => {
    const EXISTENTIAL_BALANCE = xcTokenDecimals?.data
      ? BigNumber.from(10).pow(xcTokenDecimals.data)
      : null;

    return balance && valueBn && EXISTENTIAL_BALANCE
      ? balance.sub(valueBn).gte(EXISTENTIAL_BALANCE)
      : false;
  }, [valueBn, balance, xcTokenDecimals.data]);

  const onMax = useCallback(() => onChange(maxValue), [maxValue, onChange]);

  const onCloseModal = useCallback(() => {
    reset();
    onFinish?.();
  }, [onFinish, reset]);

  return (
    <>
      <TokenInputStyled
        rightDecorator={
          <>
            {valueBn && !hasExistentialBalance && (
              <Tooltip
                placement="top"
                offset="xs"
                title={EXISTENTIAL_DEPOSIT_WARNING}
              >
                <span>
                  <WarningIconStyled />
                </span>
              </Tooltip>
            )}
            <MaxButton tabIndex={-1} onClick={onMax} />
          </>
        }
        leftDecorator={
          <TokenIcon icon={nativeTokenIcon} alt={`${nativeToken} token icon`} />
        }
        value={value}
        onChange={handleInputChange}
        error={!processing && !dataLoading && inputError}
      />
      <Button
        fullwidth
        loading={processing}
        disabled={!!inputError || disabled}
        onClick={transaction}
      >
        Transfer
      </Button>
      <CardData>
        <CardDataRow
          title="You will receive"
          loading={xcTokenDecimals.initialLoading}
          value={
            xcTokenDecimals.data && (
              <FormatToken
                symbol={xcToken}
                decimals={xcTokenDecimals.data}
                amount={valueBn}
                approx
              />
            )
          }
        />
        <CardDataRow
          title="Exchange rate"
          value={
            <span>
              {`1 ${nativeToken}`} &asymp; {`1 ${xcToken}`}
            </span>
          }
        />
        <CardDataRow
          title="Transaction fee"
          loading={xcTokenDecimals.initialLoading}
          help="Please note: this fee applies on relay chain side"
          value={
            xcTokenDecimals.data &&
            defaultRelayFee && (
              <FormatToken
                symbol={nativeToken}
                decimals={xcTokenDecimals.data}
                amount={defaultRelayFee}
              />
            )
          }
        />
        <CardDataRow
          title="Parachain fee"
          loading={xcTokenDecimals.initialLoading}
          help="Please note: this fee applies on parachain side"
          value={
            xcTokenDecimals.data &&
            parachainFee && (
              <FormatToken
                symbol={nativeToken}
                decimals={xcTokenDecimals.data}
                amount={parachainFee}
                maxDigits={6}
              />
            )
          }
        />
        <CardDataRow
          title="Total estimated fee"
          loading={xcTokenDecimals.initialLoading}
          value={
            <>
              {fee && xcTokenDecimals.data && (
                <FormatToken
                  maxDigits={6}
                  amount={fee}
                  decimals={xcTokenDecimals.data}
                  symbol={nativeToken}
                />
              )}
              {!!txCost && ` (${txCost})`}
            </>
          }
        />
      </CardData>
      {stage !== STAGE.IDLE && (
        <TxModal
          open={(stage as STAGE) !== STAGE.IDLE}
          onClose={onCloseModal}
          onRetry={transaction}
          stage={stage}
          error={error as Error}
          amount={value}
          token={nativeToken}
        />
      )}
    </>
  );
};
