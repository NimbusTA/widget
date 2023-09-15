import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { COMMON_ERRORS } from 'config';
import { useXcTokenDecimals } from 'contracts';
import { Checker, formatBalance, useError } from 'utils';

type HandleChange = React.FormEventHandler<HTMLInputElement>;

type UseCurrencyInputArgs = {
  initialValue?: string;
  shouldValidate?: boolean;
  validators?: Checker<BigNumber>[];
};

type UseCurrencyInputReturn = {
  value: string | undefined;
  valueBn: BigNumber | undefined;
  inputError: string | undefined;
  handleInputChange: HandleChange;
  onChange: (value: BigNumber | string) => void;
  reset: () => void;
};

type UseCurrencyInput = (args: UseCurrencyInputArgs) => UseCurrencyInputReturn;

function isValidNumber(value: string): boolean {
  return !!value.match(/^((0|([1-9][0-9]*))([.,][0-9]+)?)$/);
}

function inputToBn(input: string, decimals: number): [BigNumber, boolean] {
  if (!isValidNumber(input)) {
    return [Zero, false];
  }

  let result;

  const isDecimalValue = input.match(/^(\d+)[,.](\d+)$/);
  if (isDecimalValue) {
    const div = BigNumber.from(input.replace(/[.,]\d*$/, ''));
    const modString = input.replace(/^\d+[.,]/, '').substr(0, decimals);
    const mod = BigNumber.from(modString);

    result = div
      .mul(BigNumber.from(10).pow(decimals))
      .add(mod.mul(BigNumber.from(10).pow(decimals - modString.length)));
  } else {
    result = BigNumber.from(input.replace(/[^\d]/g, '')).mul(
      BigNumber.from(10).pow(decimals),
    );
  }

  return [result, true];
}

function getValuesFromString(
  value: string,
  decimals: number,
): [string, BigNumber, boolean] {
  const [valueBn, isValid] = inputToBn(value, decimals);

  return [value, valueBn, isValid];
}

function getValuesFromBn(
  valueBn: BigNumber,
  decimals?: number,
): [string, BigNumber, boolean] {
  const value = decimals
    ? formatBalance({ balance: valueBn, decimals })
    : valueBn.toString();

  return [value, valueBn, true];
}

function getValues(
  value?: BigNumber | string,
  decimals?: number,
): [string, BigNumber | undefined, boolean] {
  if (!value) return ['', undefined, true];
  if (!decimals) return [value.toString(), undefined, false];

  return BigNumber.isBigNumber(value)
    ? getValuesFromBn(value, decimals)
    : getValuesFromString(value, decimals);
}

export const useCurrencyInput: UseCurrencyInput = ({
  initialValue = '',
  shouldValidate,
  validators = [],
}) => {
  const xcTokenDecimals = useXcTokenDecimals();
  const [[value, valueBn, isValid], setValues] = useState<
    [string, BigNumber | undefined, boolean]
  >(() => getValues(initialValue, xcTokenDecimals.data));

  const onChange = useCallback(
    (input: string | BigNumber) =>
      setValues(getValues(input, xcTokenDecimals.data)),
    [xcTokenDecimals.data],
  );

  useEffect(() => {
    if (xcTokenDecimals.data) {
      onChange(value);
    }
  }, [onChange, value, xcTokenDecimals.data]);

  const checkers = useMemo(
    () => [
      {
        condition: !isValid,
        message: COMMON_ERRORS.validPositiveNumber,
      },
      {
        condition: (value: BigNumber) => !value.gt(Zero),
        message: COMMON_ERRORS.zeroAmount,
      },
      ...validators,
    ],
    [isValid, validators],
  );

  const inputError = useError(valueBn, shouldValidate, checkers);

  const handleInputChange: HandleChange = useCallback(
    (event) => {
      onChange(event?.currentTarget.value);
    },
    [onChange],
  );

  const reset = useCallback(() => {
    onChange(initialValue);
  }, [onChange, initialValue]);

  return {
    value,
    valueBn,
    inputError,
    handleInputChange,
    onChange,
    reset,
  };
};
