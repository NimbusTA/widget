import { useSDK } from '@lido-sdk/react';
import { useConnectors } from '@lido-sdk/web3-react';
import { ConnectorsContextValue as ConnectorsContextValueBase } from '@lido-sdk/web3-react';
import { TalismanConnector } from '@talismn/web3react-v6-connector';
import { createContext, FC, memo, PropsWithChildren, useMemo } from 'react';

import { useAutoConnect } from 'common/wallets';

export type ConnectorsContextValue = ConnectorsContextValueBase & {
  talisman: TalismanConnector;
};

export type Connector = keyof ConnectorsContextValue;

export const ConnectorsContext = createContext({} as ConnectorsContextValue);

const AutoConnect = (props: { connectors: ConnectorsContextValue }) => {
  useAutoConnect(props.connectors);
  return null;
};

const ProviderConnectors: FC<PropsWithChildren> = ({ children }) => {
  const { supportedChainIds } = useSDK();

  const connectorsBase = useConnectors();
  const connectors = useMemo(
    () => ({
      ...connectorsBase,
      talisman: new TalismanConnector({ supportedChainIds }),
    }),
    [connectorsBase, supportedChainIds],
  );

  return (
    <ConnectorsContext.Provider value={connectors}>
      <AutoConnect connectors={connectors} />
      {children}
    </ConnectorsContext.Provider>
  );
};

export default memo<FC<PropsWithChildren>>(ProviderConnectors);
