import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';

import { useSDK, useEthereumBalance } from '@lido-sdk/react';
import { Button } from '@lidofinance/lido-ui';

import { useRouter } from 'next/router';
import React, { FC, useCallback, useMemo } from 'react';

import { CardData, CardDataRow } from 'components/cardData';
import FormatToken from 'components/formatToken';
import { TokenIcon } from 'components/tokenIcon';

import { WalletConnectButtonParachain } from 'common/wallets';
import {
  parachainToken,
  nativeToken,
  upwardRelayFee,
  xcToken,
  PARACHAIN_DECIMALS,
  COMMON_ERRORS,
  getTokenIcon,
  TOKENS,
} from 'config';

import { useXcTokenBalance, useXcTokenDecimals } from 'contracts';

import {
  useSubstrate,
  useSubstrateBalance,
  useEstimateReverseTransfer,
  useReverseTransfer,
} from 'features/transfer';
import { STAGE, TxModal } from 'features/transfer/components/txModal';
import { useTxPrice, useCumulativeCost, useCurrencyInput } from 'hooks';
import { useError } from 'utils';

import { TokenInputStyled } from './transferCardStyles';
import { TransferComponentProps } from './types';

const XCTokenIcon = getTokenIcon(TOKENS.xcToken);

const useExistentialTransfer = (amount: BigNumber | undefined) => {
  const { data: balance } = useSubstrateBalance();
  const relayFee = BigNumber.from(upwardRelayFee.toString());

  const xcTokenDecimals = useXcTokenDecimals();

  const hasExistentialBalance = useMemo(() => {
    const EXISTENTIAL_BALANCE = xcTokenDecimals?.data
      ? BigNumber.from(10).pow(xcTokenDecimals.data)
      : null;

    return balance && amount && EXISTENTIAL_BALANCE
      ? balance.add(amount).sub(relayFee).gte(EXISTENTIAL_BALANCE)
      : false;
  }, [amount, balance, relayFee, xcTokenDecimals.data]);

  return hasExistentialBalance;
};

export const ReversedTransfer: FC<TransferComponentProps> = () => {
  const xcTokenBalance = useXcTokenBalance();
  const xcTokenDecimals = useXcTokenDecimals();

  const parachainTokenBalance = useEthereumBalance();

  const { account } = useSDK();
  const { selectedAccount: substrateAccount } = useSubstrate();

  const maxValue = xcTokenBalance?.data || Zero;

  const dataLoading =
    xcTokenDecimals.loading ||
    xcTokenBalance.loading ||
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

  const txGas = useEstimateReverseTransfer(
    valueBn,
    substrateAccount?.address,
    !inputError,
  );
  const txPrice = useTxPrice(txGas.data);

  const hasAvailableFee =
    !!txPrice && !!parachainTokenBalance?.data?.gte(txPrice);
  const hasExistentialTransfer = useExistentialTransfer(valueBn);

  const feeDepositCheckers = useMemo(
    () => [
      {
        condition: !hasAvailableFee,
        message: COMMON_ERRORS.hasAvailableFee,
      },
      {
        condition: !hasExistentialTransfer,
        message: COMMON_ERRORS.hasExistentialDeposit,
      },
    ],
    [hasAvailableFee, hasExistentialTransfer],
  );

  const additionalError = useError(
    null,
    !!valueBn && !parachainTokenBalance.loading && !txGas.loading,
    feeDepositCheckers,
  );

  const onSuccess = useCallback(
    () => xcTokenBalance.update(),
    [xcTokenBalance],
  );

  const {
    transaction,
    canProcess,
    processing,
    txHash,
    onFinish,
    error,
    stage,
  } = useReverseTransfer({
    amount: valueBn,
    receiver: substrateAccount?.address,
    onSuccess,
  });

  const relayFee = BigNumber.from(upwardRelayFee.toString());
  const txCost = useCumulativeCost(relayFee, txPrice);

  const onMax = useCallback(() => onChange(maxValue), [maxValue, onChange]);

  const onCloseModal = useCallback(() => {
    reset();
    onFinish?.();
  }, [onFinish, reset]);

  return (
    <>
      <TokenInputStyled
        onMax={onMax}
        leftDecorator={
          <TokenIcon icon={XCTokenIcon} alt={`${xcToken} token icon`} />
        }
        value={value}
        onChange={handleInputChange}
        error={!processing && !dataLoading && (inputError || additionalError)}
      />
      {account ? (
        <Button
          fullwidth
          loading={processing || dataLoading}
          disabled={!canProcess || !!inputError || !!additionalError}
          onClick={transaction}
        >
          Transfer
        </Button>
      ) : (
        <WalletConnectButtonParachain fullwidth />
      )}
      <CardData>
        <CardDataRow
          title="You will receive"
          loading={xcTokenDecimals.initialLoading}
          value={
            xcTokenDecimals.data && (
              <FormatToken
                symbol={nativeToken}
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
              {`1 ${xcToken}`} &asymp; {`1 ${nativeToken}`}
            </span>
          }
        />
        <CardDataRow
          highlight={!hasAvailableFee}
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
          title="Transaction fee"
          value={
            <FormatToken
              maxDigits={6}
              amount={txPrice}
              decimals={PARACHAIN_DECIMALS}
              symbol={parachainToken}
            />
          }
        />
        <CardDataRow
          title="Relay chain fee"
          loading={xcTokenDecimals.initialLoading}
          help={`Please note: this fee applies to ${nativeToken}s on relaychain side and will be subtracted from ${nativeToken} that you will receive on parachain side`}
          value={
            xcTokenDecimals.data && (
              <FormatToken
                maxDigits={6}
                amount={relayFee}
                decimals={xcTokenDecimals.data}
                symbol={nativeToken}
              />
            )
          }
        />
        <CardDataRow
          title="Total estimated cost"
          loading={xcTokenDecimals.initialLoading}
          value={
            xcTokenDecimals.data && (
              <>
                <FormatToken
                  maxDigits={6}
                  amount={relayFee}
                  decimals={xcTokenDecimals.data}
                  symbol={nativeToken}
                />{' '}
                +{' '}
                <FormatToken
                  maxDigits={6}
                  amount={txPrice}
                  decimals={PARACHAIN_DECIMALS}
                  symbol={parachainToken}
                />
                {!!txCost && ` (${txCost})`}
              </>
            )
          }
        />
      </CardData>
      <TxModal
        open={(stage as STAGE) !== STAGE.IDLE}
        onClose={onCloseModal}
        onRetry={transaction}
        stage={stage}
        error={error as Error}
        txHash={txHash}
        amount={value}
        token={xcToken}
      />
    </>
  );
};
