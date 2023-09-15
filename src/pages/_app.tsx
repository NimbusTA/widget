import { ToastContainer, CookiesTooltip } from '@lidofinance/lido-ui';
import NextApp, { AppProps, AppContext } from 'next/app';
import getConfig from 'next/config';
import { memo } from 'react';

import { withCsp } from 'utils/withCsp';

import { Providers } from 'providers';

import { CustomAppProps } from 'types';

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

const MemoApp = memo(App);

const AppWrapper = (props: CustomAppProps): JSX.Element => {
  const { config, ...rest } = props;

  return (
    <Providers config={config || {}}>
      <MemoApp {...rest} />
      <ToastContainer />
      <CookiesTooltip />
    </Providers>
  );
};

AppWrapper.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  const { publicRuntimeConfig } = getConfig();

  return { ...appProps, config: publicRuntimeConfig };
};

export default process.env.NODE_ENV === 'development'
  ? AppWrapper
  : withCsp(AppWrapper);
