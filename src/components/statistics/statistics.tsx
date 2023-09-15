import { Block, DataTable, DataTableRow, Link } from '@lidofinance/lido-ui';
import isUndefined from 'lodash/isUndefined';
import React, { FC, useMemo } from 'react';

import { Section } from 'common/layout';

import {
  DEFAULT_VALUE,
  getAddressExplorerLink,
  getTokenAddress,
  TOKENS,
  liquidToken,
  nativeToken,
} from 'config';
import { formatAPR, useAPR, useStatistics } from 'hooks';
import { numberWithCommas } from 'utils';

export const Statistics: FC = () => {
  const statistics = useStatistics();
  const apr = useAPR();

  const { totalStakedToken, totalStakedUsd, stakers, rewardsToken } =
    useMemo(() => {
      const totalStakedToken = statistics?.data?.totalStaked?.token;
      const totalStakedUsd = statistics?.data?.totalStaked?.usd;
      const stakers = statistics?.data?.stakers;
      const rewardsToken = statistics?.data?.totalRewards;

      return {
        totalStakedUsd: isUndefined(totalStakedUsd)
          ? DEFAULT_VALUE
          : `$${numberWithCommas(totalStakedUsd)}`,
        totalStakedToken: isUndefined(totalStakedToken)
          ? DEFAULT_VALUE
          : `${numberWithCommas(totalStakedToken)} ${nativeToken}`,
        stakers: isUndefined(stakers) ? DEFAULT_VALUE : stakers,
        rewardsToken: isUndefined(rewardsToken)
          ? DEFAULT_VALUE
          : `${numberWithCommas(rewardsToken)} ${nativeToken}`,
      };
    }, [statistics]);

  const nimbusAddress = getTokenAddress(TOKENS.liquidToken);
  const ExplorerUrl = getAddressExplorerLink(nimbusAddress);

  return (
    <Section
      title="Nimbus statistics"
      headerDecorator={<Link href={ExplorerUrl}>View in Explorer</Link>}
    >
      <Block>
        <DataTable>
          <DataTableRow
            highlight={apr !== DEFAULT_VALUE}
            title="Annual percentage rate"
            loading={statistics.isLoading}
          >
            {formatAPR(apr)}
          </DataTableRow>
          <DataTableRow
            title="Total staked with Nimbus"
            loading={statistics.isLoading}
          >
            {totalStakedToken}
          </DataTableRow>
          <DataTableRow title="Stakers" loading={statistics.isLoading}>
            {stakers}
          </DataTableRow>
          <DataTableRow
            title={`${liquidToken} market cap`}
            loading={statistics.isLoading}
          >
            {totalStakedUsd}
          </DataTableRow>
          <DataTableRow title="Rewards paid" loading={statistics.isLoading}>
            {rewardsToken}
          </DataTableRow>
        </DataTable>
      </Block>
    </Section>
  );
};
