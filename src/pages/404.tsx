import { ServicePage } from '@lidofinance/lido-ui';
import Head from 'next/head';
import { FC } from 'react';

const Page404: FC = () => (
  <ServicePage title="404">
    <Head>
      <title>Nimbus | Page Not Found</title>
    </Head>
    Page Not Found
  </ServicePage>
);

export default Page404;
