import { useContext } from 'react';

import { ConnectorsContext, ConnectorsContextValue } from 'providers';

export const useConnectors = (): ConnectorsContextValue => {
  return useContext(ConnectorsContext);
};
