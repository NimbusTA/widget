import {
  useConnectorInfo as useConnectorBaseInfo,
  useWeb3,
  Connector,
} from '@lido-sdk/web3-react';
import { TalismanConnector } from '@talismn/web3react-v6-connector';
import { InjectedConnector } from '@web3-react/injected-connector';

import {
  isDappBrowserProvider,
  isInjectedTalismanProvider,
  isTalismanProvider,
} from '../../../utils';

type ConnectorInfo = {
  providerName?: string;
  connectorName?: Connector;

  isInjected: boolean;
  isDappBrowser: boolean;
  isMetamask: boolean;
  isTalisman: boolean;
};

export const useConnectorInfo = (): ConnectorInfo => {
  const connectorProps = useConnectorBaseInfo();
  const { active, connector } = useWeb3();

  const isInjected = active && connector instanceof InjectedConnector;
  const isDappBrowser = isInjected && isDappBrowserProvider();
  const isTalismanConnector = active && connector instanceof TalismanConnector;
  // Talisman can be connected wia InjectedConnector
  // and wia Talisman Connector
  const isTalisman =
    (isTalismanConnector && isTalismanProvider()) ||
    (isInjected && isInjectedTalismanProvider());

  const providerName = (() => {
    if (isTalisman) return 'Talisman';

    return connectorProps?.providerName;
  })();

  return {
    ...connectorProps,
    providerName,

    isInjected,
    isDappBrowser,
    isTalisman,
  };
};
