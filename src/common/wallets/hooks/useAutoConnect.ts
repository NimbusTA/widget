import { useDisconnect, useWeb3 } from '@lido-sdk/web3-react';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useCallback, useEffect, useRef } from 'react';
import warning from 'tiny-warning';

import { ConnectorsContextValue } from 'providers';

import { useConnectorInfo } from './useConnectorInfo';
import { useConnectorStorage } from './useConnectorStorage';
import { isDappBrowserProvider } from '../../../utils';

export const useAutoConnect = (connectors: ConnectorsContextValue): void => {
  useEagerConnector(connectors);
  useSaveConnectorToLS();
  useDeleteConnectorFromLS();
  useWatchConnectorInLS();
};

export const useEagerConnector = (connectors: ConnectorsContextValue): void => {
  const { active, activate } = useWeb3();
  const [savedConnector] = useConnectorStorage();
  const tried = useRef(false);

  const getEagerConnector =
    useCallback(async (): Promise<AbstractConnector | null> => {
      const { injected } = connectors;

      // Dapp browsers
      if (isDappBrowserProvider()) return injected;

      // Saved in LS
      const saved = savedConnector && connectors[savedConnector];
      if (saved) return saved;

      return null;
    }, [connectors, savedConnector]);

  useEffect(() => {
    if (tried.current || active) return;

    (async () => {
      tried.current = true;

      const connector = await getEagerConnector();
      if (!connector) return;

      try {
        await activate(connector, undefined, true);
      } catch (error) {
        warning(false, 'Connector is not activated');
      }
    })();
  }, [activate, getEagerConnector, active]);
};

export const useSaveConnectorToLS = (): void => {
  const [, saveConnector] = useConnectorStorage();
  const { isInjected, isDappBrowser, isTalisman } = useConnectorInfo();

  useEffect(() => {
    if (isInjected && !isDappBrowser) return saveConnector('injected');
    if (isTalisman) return saveConnector('talisman');
  }, [isInjected, isDappBrowser, saveConnector, isTalisman]);
};

export const useDeleteConnectorFromLS = (): void => {
  const [, saveConnector] = useConnectorStorage();
  const { active } = useWeb3();

  const lastState = useRef(active);

  useEffect(() => {
    const isStateChanged = lastState.current !== active;
    const isDisconnected = !active;

    lastState.current = active;

    if (isStateChanged && isDisconnected) {
      saveConnector(null);
    }
  }, [active, saveConnector]);
};

export const useWatchConnectorInLS = (): void => {
  const [savedConnector] = useConnectorStorage();
  const { disconnect } = useDisconnect();
  const lastConnector = useRef(savedConnector);

  useEffect(() => {
    const isConnectorChanged = lastConnector.current !== savedConnector;
    const isDisconnected = !savedConnector;

    lastConnector.current = savedConnector;

    if (isConnectorChanged && isDisconnected) {
      disconnect?.();
    }
  }, [savedConnector, disconnect]);
};
