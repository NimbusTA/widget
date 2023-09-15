import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, MouseEvent } from 'react';
import styled from 'styled-components';

import { Statistics } from 'components/statistics';

import Switch from 'components/switch';

import { Layout } from 'common/layout';
import { liquidToken, nativeToken, xcToken } from 'config';
import { StakeCard, useDepositCapReached } from 'features/stake';
import { StakeFaq } from 'features/stake';
import { UnstakeCard } from 'features/unstake';

const TabsSliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spaceMap.xl}px;
`;

const Stake: FC = () => {
  const router = useRouter();
  const { mode } = router.query;

  useDepositCapReached();

  const handleTabChange = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push({
      pathname: '/',
      query: mode === 'unstake' ? {} : { mode: 'unstake' },
    });
  };

  const unstakeMode = mode === 'unstake';

  const subtitle = unstakeMode
    ? `Unstake ${liquidToken} and receive ${xcToken} after unbonding period`
    : `Stake ${xcToken} and receive ${liquidToken} while staking`;

  return (
    <>
      <Layout title="Stake & Unstake" subtitle={subtitle}>
        <Head>
          <title>Stake {nativeToken} with Nimbus | Nimbus</title>
        </Head>
        <TabsSliderWrapper>
          <Switch
            checked={unstakeMode}
            checkedLabel="Stake"
            uncheckedLabel="Unstake"
            onClick={(e) => handleTabChange(e)}
          />
        </TabsSliderWrapper>
        {unstakeMode ? <UnstakeCard /> : <StakeCard />}
        <Statistics />
        <StakeFaq />
      </Layout>
    </>
  );
};

export default Stake;
