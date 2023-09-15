import {
  HStack,
  InlineLoader,
  Link,
  StackItem,
  Text,
  trimAddress,
} from '@lidofinance/lido-ui';
import { BigNumber } from 'ethers';
import React, { FC, useCallback } from 'react';

import { getAddressExplorerLink } from 'config';
import { useXcTokenDecimals } from 'contracts';

import { formatBalance } from 'utils';

import { getPolkadotValidatorLink, getValidatorsExplorerLink } from './config';
import { ValidatorsResponse } from './hooks';
import {
  BalanceData,
  ValidatorsLinkLeftWrapper,
  ValidatorsLinkRightWrapper,
  ValidatorsMobileRow,
  ValidatorsMobileSecondColumn,
} from './validatorsBlockStyles';
import { ValidatorsError } from './validatorsError';
import { ValidatorsLink } from './validatorsLink';

export const ValidatorsMobile: FC<ValidatorsResponse> = ({
  isLoading,
  isError,
  data,
  refetch,
}) => {
  const decimals = useXcTokenDecimals();

  const refreshCallback = useCallback(() => refetch(), [refetch]);

  return (
    <>
      {isLoading && <InlineLoader />}
      {isError && <ValidatorsError onRefresh={refreshCallback} />}

      {!isLoading &&
        data &&
        data.map((validator) => (
          <ValidatorsMobileRow
            key={`mobile-validator-${validator.stash}`}
            justify="space-between"
          >
            <StackItem>
              <Link href={getAddressExplorerLink(validator.ledger)}>
                {trimAddress(validator.ledger, 4)}
              </Link>
              <Text size="xxs">In current era:</Text>
              <ValidatorsLinkLeftWrapper>
                <ValidatorsLink
                  link={getValidatorsExplorerLink(validator.stash)}
                  validatorAddress={validator.stash}
                  fullInfo
                />
              </ValidatorsLinkLeftWrapper>
            </StackItem>
            <ValidatorsMobileSecondColumn>
              <BalanceData>
                {decimals.initialLoading ? (
                  <InlineLoader />
                ) : (
                  formatBalance({
                    balance: BigNumber.from(validator.active_stake.toString()),
                    decimals: decimals.data,
                  })
                )}
              </BalanceData>
              <Text size="xxs">In nomination:</Text>
              <ValidatorsLinkRightWrapper>
                <HStack wrap="wrap" justify="end">
                  {validator.validators.map((validatorNominating) => (
                    <StackItem key={validatorNominating}>
                      <ValidatorsLink
                        validatorAddress={validatorNominating}
                        link={getPolkadotValidatorLink(validatorNominating)}
                      />
                    </StackItem>
                  ))}
                </HStack>
              </ValidatorsLinkRightWrapper>
            </ValidatorsMobileSecondColumn>
          </ValidatorsMobileRow>
        ))}
    </>
  );
};
