import { useSDK } from '@lido-sdk/react';
import { useWeb3 } from '@lido-sdk/web3-react';
import { TalismanConnector } from '@talismn/web3react-v6-connector';
import { useCallback } from 'react';

import { getChainNativeCurrency, parachainName } from 'config';

import { hasInjected, hasTalisman } from '../../../utils';

const HexCharacters = '0123456789abcdef';
export function hexlify(value: number): string {
  let hex = '';
  while (value) {
    hex = HexCharacters[value & 0xf] + hex;
    value = Math.floor(value / 16);
  }

  if (hex.length) {
    return '0x' + hex;
  }
  return '0x00';
}

type SwitchChainRPCReturnType = {
  switchChain?: () => Promise<boolean | undefined>;
  chainName: string;
};

export const useSwitchChainRPC = (rpcUrl: string): SwitchChainRPCReturnType => {
  const { providerWeb3, onError, chainId: connectedChainId } = useSDK();
  const { connector } = useWeb3();

  const chainId = connectedChainId;

  const nativeCurrency = getChainNativeCurrency(chainId as number);

  const provider: any =
    (connector instanceof TalismanConnector &&
      hasTalisman() &&
      window.talismanEth) ||
    providerWeb3?.provider ||
    (hasInjected() && window.ethereum);

  const handleChainSwitch = useCallback(async () => {
    if (!provider?.request) return false;

    try {
      const switchResult = await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexlify(chainId) }],
      });

      return !!switchResult;
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          const addResult = await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: hexlify(chainId),
                rpcUrls: [rpcUrl],
                chainName: parachainName,
                nativeCurrency,
              },
            ],
          });

          return !!addResult;
        } catch (addError) {
          onError(addError as Error);
          return false;
        }
      }
    }
  }, [provider, chainId, rpcUrl, nativeCurrency, onError]);

  const canSwitch = provider.isMetaMask || provider.isTalisman;
  const switchChain = canSwitch ? handleChainSwitch : undefined;

  return {
    switchChain,
    chainName: parachainName,
  };
};
