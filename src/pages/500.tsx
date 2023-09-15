import { ServicePage } from '@lidofinance/lido-ui';
import Head from 'next/head';
import { FC } from 'react';

const Page404: FC = () => (
  <ServicePage title="500">
    <Head>
      <title>Nimbus | Internal Server Error</title>
    </Head>
    Internal Server Error
  </ServicePage>
);

export default Page404;
