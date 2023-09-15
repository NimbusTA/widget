import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ProviderConnectors from './connectors';
import { ModalsProvider } from './modals';
import ThemeProvider from './theme';
import { Web3ProviderProps, Web3Provider } from './web3';

const queryClient = new QueryClient();

export const Providers: FC<Web3ProviderProps> = ({ config, children }) => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <Web3Provider config={config}>
        <ProviderConnectors>
          <ModalsProvider>{children}</ModalsProvider>
        </ProviderConnectors>
      </Web3Provider>
    </QueryClientProvider>
  </ThemeProvider>
);
