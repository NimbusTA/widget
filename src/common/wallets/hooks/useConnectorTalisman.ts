import { openWindow } from '@lido-sdk/helpers';
import { useForceDisconnect, useWeb3 } from '@lido-sdk/web3-react';
import { TalismanConnector } from '@talismn/web3react-v6-connector';
import fp from 'lodash/fp';
import { useCallback } from 'react';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';

import { hasInjected, isTalismanProvider } from 'utils';

import { useConnectors } from './useConnectors';
import { PREDEFINED_WALLETS } from '../wallets';

type ConnectorHookResult = {
  connect: () => Promise<void>;
  connector: TalismanConnector;
};

const TalismanInfo = fp.find({ title: 'Talisman' }, PREDEFINED_WALLETS);

export const useConnectorTalisman = (): ConnectorHookResult => {
  const { talisman } = useConnectors();
  const { activate } = useWeb3();
  const { disconnect } = useForceDisconnect();

  const openInWallet = useCallback(() => {
    try {
      openWindow(TalismanInfo?.installUrl ?? '');
    } catch (error) {
      warning(false, 'Failed to open the link');
    }
  }, []);

  const connect = useCallback(async () => {
    invariant(talisman, 'Connector is required');

    if (hasInjected() && isTalismanProvider()) {
      await disconnect();
      activate(talisman);
    } else {
      openInWallet();
    }
  }, [activate, disconnect, openInWallet, talisman]);

  return {
    connect,
    connector: talisman,
  };
};
