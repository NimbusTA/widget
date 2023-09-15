import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, MouseEvent } from 'react';
import styled from 'styled-components';

import { Statistics } from 'components/statistics';
import Switch from 'components/switch';

// import { Faq } from 'common/faq';
// import { FAQItem, getFaqList } from 'common/faq/faqList';
import { Layout } from 'common/layout';
import { parachainName, relayChainName } from 'config';
import {
  SubstrateApiContextProvider,
  SubstrateContextProvider,
  SubstrateModalsProvider,
  useAutoConnect,
} from 'features/transfer';
import TransferCard from 'features/transfer/cardsAndWallets/transferCard';

interface TransferProps {
  // faqList: FAQItem[];
}

const TabsSliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spaceMap.xl}px;
`;

const SubstrateAutoConnect: FC = () => {
  useAutoConnect();
  return null;
};

const Transfers: FC<TransferProps> = () => {
  const router = useRouter();
  const { mode } = router.query;

  const handleTabChange = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.push({
      pathname: '/transfers',
      query: mode === 'upward' ? {} : { mode: 'upward' },
    });
  };

  const upwardMode = mode === 'upward';

  return (
    <SubstrateApiContextProvider>
      <SubstrateContextProvider>
        <SubstrateModalsProvider>
          <SubstrateAutoConnect />
          <Layout
            title="Transfer"
            subtitle={`Transfer tokens from ${
              upwardMode ? parachainName : relayChainName
            } to ${upwardMode ? relayChainName : parachainName}`}
          >
            <Head>
              <title>Transfer | Nimbus</title>
            </Head>
            <TabsSliderWrapper>
              <Switch
                checked={upwardMode}
                checkedLabel="Downward"
                uncheckedLabel="Upward"
                onClick={(e) => handleTabChange(e)}
              />
            </TabsSliderWrapper>
            <TransferCard reversed={upwardMode} />
            <Statistics />
            {/*<Faq faqList={faqList} />*/}
          </Layout>
        </SubstrateModalsProvider>
      </SubstrateContextProvider>
    </SubstrateApiContextProvider>
  );
};

export default Transfers;

// const faqList = getFaqList([
//   'existential-deposit',
//   'how-get-native-token',
//   'what-is-nimbus',
//   'what-is-wrapped-token',
//   'how-swap-erc20',
//   'how-does-nimbus-work',
//   'what-is-liquid-staking',
//   'what-is-liquid-token',
//   'which-wallet-support',
//   'liquid-over-traditional',
//   'how-redeem-liquid-token',
//   'what-is-native-token',
//   'how-calculate-earnings',
//   'what-are-risks',
//   'what-fee',
// ]);

// export const getServerSideProps: GetServerSideProps<
//   TransferProps
// > = async () => {
//   return { props: { faqList: await faqList } };
// };
