import {
  Tbody,
  Td,
  Tr,
  Thead,
  Text,
  trimAddress,
  InlineLoader,
  Link,
  useBreakpoint,
} from '@lidofinance/lido-ui';
import { BigNumber } from 'ethers';
import React, { FC, useCallback } from 'react';

import { Pagination, usePaginatedData } from 'components/pagination';

import { getAddressExplorerLink } from 'config';
import { useXcTokenDecimals } from 'contracts';

import { formatBalance } from 'utils';

import { getPolkadotValidatorLink, getValidatorsExplorerLink } from './config';
import { ValidatorsInfo } from './hooks';
import { useValidators } from './hooks';
import {
  BalanceData,
  ValidatorsTable,
  ValidatorsTableContainer,
  ValidatorsTd,
  ValidatorsTh,
  ValidatorsWrapper,
  ValidatorsLinkWrapper,
  ValidatorsHeading,
  ValidatorsButton,
} from './validatorsBlockStyles';
import { ValidatorsError } from './validatorsError';
import { ValidatorsLink } from './validatorsLink';
import { ValidatorsMobile } from './validatorsMobile';

const LoadingTableDataComponent: FC = () => (
  <Tr>
    <Td>
      <InlineLoader />
    </Td>
    <Td>
      <InlineLoader />
    </Td>
    <Td>
      <InlineLoader />
    </Td>
    <Td>
      <InlineLoader />
    </Td>
  </Tr>
);

const LoadingTableData = React.memo(LoadingTableDataComponent);

const ValidatorRow: FC<ValidatorsInfo> = ({
  active_stake,
  validators,
  ledger,
  stash,
}) => {
  const decimals = useXcTokenDecimals();

  return (
    <Tr key={ledger}>
      <Td>
        <Link href={getAddressExplorerLink(ledger)}>
          {trimAddress(ledger, 4)}
        </Link>
      </Td>
      <ValidatorsTd>
        <ValidatorsLinkWrapper>
          {validators.map((validatorNominating) => (
            <ValidatorsLink
              key={validatorNominating}
              validatorAddress={validatorNominating}
              link={getPolkadotValidatorLink(validatorNominating)}
            />
          ))}
        </ValidatorsLinkWrapper>
      </ValidatorsTd>
      <ValidatorsTd>
        <ValidatorsLinkWrapper>
          <ValidatorsLink
            link={getValidatorsExplorerLink(stash)}
            validatorAddress={stash}
            fullInfo
          />
        </ValidatorsLinkWrapper>
      </ValidatorsTd>
      <Td>
        <BalanceData>
          {decimals.initialLoading ? (
            <InlineLoader />
          ) : (
            formatBalance({
              balance: BigNumber.from(active_stake.toString()),
              decimals: decimals.data,
            })
          )}
        </BalanceData>
      </Td>
    </Tr>
  );
};

export const ValidatorsBlock: FC = () => {
  const validators = useValidators();

  const pageSize = 5;

  const { currentPage, onPageChange, paginatedData } = usePaginatedData(
    validators?.data || [],
    pageSize,
  );

  const refreshCallback = useCallback(() => validators.refetch(), [validators]);

  const isMobile = useBreakpoint('lg');
  const isSmallMobile = useBreakpoint('md');

  return (
    <ValidatorsWrapper>
      <ValidatorsHeading>
        <Text size="sm" strong>
          Validator list
        </Text>
        <ValidatorsButton
          onClick={refreshCallback}
          size="xs"
          variant="outlined"
          color="secondary"
          fullwidth={isSmallMobile}
        >
          Refresh
        </ValidatorsButton>
      </ValidatorsHeading>

      {isMobile ? (
        <ValidatorsMobile {...validators} />
      ) : (
        <ValidatorsTableContainer>
          {!validators.isLoading && validators.isError && (
            <ValidatorsError onRefresh={refreshCallback} />
          )}
          {!validators.isError && (
            <ValidatorsTable width="100%">
              <Thead>
                <Tr>
                  <ValidatorsTh style={{ width: '20%' }}>
                    Ledger Address
                  </ValidatorsTh>
                  <ValidatorsTh style={{ width: '30%' }}>
                    Validators&nbsp;in&nbsp;Nomination
                  </ValidatorsTh>
                  <ValidatorsTh style={{ width: '30%' }}>
                    Nominated Validator in&nbsp;current Era
                  </ValidatorsTh>
                  <ValidatorsTh style={{ width: '20%' }}>
                    Active&nbsp;Stake,&nbsp;KSM
                  </ValidatorsTh>
                </Tr>
              </Thead>
              <Tbody>
                {!validators.isLoading ? (
                  paginatedData.map((validator) => (
                    <ValidatorRow key={validator.ledger} {...validator} />
                  ))
                ) : (
                  <>
                    <LoadingTableData />
                    <LoadingTableData />
                    <LoadingTableData />
                  </>
                )}
              </Tbody>
            </ValidatorsTable>
          )}
        </ValidatorsTableContainer>
      )}

      {!validators.isLoading && (
        <Pagination
          onPageChange={onPageChange}
          totalCount={validators?.data?.length || 0}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      )}
    </ValidatorsWrapper>
  );
};
