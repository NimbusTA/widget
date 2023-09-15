import { Container, useBreakpoint } from '@lidofinance/lido-ui';
import Head from 'next/head';

import { useRouter } from 'next/router';
import React, { FC, MouseEvent } from 'react';

import styled from 'styled-components';

import Switch from 'components/switch';

import { Layout } from 'common/layout';
import { relayChainName } from 'config';

import { ValidatorsPlaygroundBlock } from 'features/playground';
import { ValidatorsBlock, ValidatorsFaq } from 'features/validators';

const TabsSliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spaceMap.xl}px;
`;

const Validators: FC = () => {
  const router = useRouter();
  const { mode } = router.query;

  const handleTabChange = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push({
      pathname: '/validators',
      query: mode === 'playground' ? {} : { mode: 'playground' },
    });
  };

  const playgroundMode = mode === 'playground';

  const isMobile = useBreakpoint('lg');

  const subtitle =
    !isMobile && playgroundMode
      ? 'Test staking strategies with real network data.'
      : `See what validators are chosen by Nimbus on ${relayChainName}`;

  return (
    <>
      <Layout title="Validators" subtitle={subtitle} size="full">
        <Head>
          <title>Validators | Nimbus</title>
        </Head>
        {!isMobile && (
          <TabsSliderWrapper>
            <Switch
              checked={playgroundMode}
              checkedLabel="Nominated"
              uncheckedLabel="Playground"
              onClick={(e) => handleTabChange(e)}
            />
          </TabsSliderWrapper>
        )}
        {!isMobile && playgroundMode ? (
          <ValidatorsPlaygroundBlock />
        ) : (
          <ValidatorsBlock />
        )}
        <Container size="tight">
          <ValidatorsFaq />
        </Container>
      </Layout>
    </>
  );
};

export default Validators;
