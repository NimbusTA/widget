import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { FC } from 'react';

import { Layout } from 'common/layout';
import { liquidToken } from 'config';
import { DefiBlock } from 'features/defi/defiBlock';

interface DeFiProps {}

const DeFi: FC<DeFiProps> = () => {
  return (
    <Layout
      size="full"
      title="DeFi"
      subtitle={`Use ${liquidToken} in liquidity mining`}
    >
      <Head>
        <title>DeFi | Nimbus</title>
      </Head>
      <DefiBlock />
    </Layout>
  );
};

export default DeFi;

export const getServerSideProps: GetServerSideProps<DeFiProps> = async () => {
  return { props: {} };
};
