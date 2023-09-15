import { CHAINS } from '@lido-sdk/constants';
import { ProviderWeb3 } from '@lido-sdk/web3-react';
import React, { FC, PropsWithChildren, useMemo } from 'react';

import { getBackendRPCPath } from 'config';

export type EnvConfig = {
  defaultChain: string;
};

export type Web3ProviderProps = PropsWithChildren & { config: EnvConfig };

export const Web3Provider: FC<Web3ProviderProps> = ({ children, config }) => {
  const defaultChainId = parseInt(config.defaultChain);
  const backendRPC = useMemo(
    () => ({
      [defaultChainId]: getBackendRPCPath(defaultChainId),
      [CHAINS.Mainnet]: getBackendRPCPath(defaultChainId),
    }),
    [defaultChainId],
  );

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ProviderWeb3
      defaultChainId={defaultChainId}
      supportedChainIds={[defaultChainId]}
      rpc={backendRPC}
      autoConnectEnabled={false}
    >
      {children}
    </ProviderWeb3>
  );
};
