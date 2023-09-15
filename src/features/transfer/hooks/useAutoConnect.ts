import { useEffect, useRef } from 'react';
import warning from 'tiny-warning';

import { useIsMountedRef } from './useIsMountedRef';
import { useSubstrateApi } from '../provider';

export const useAutoConnect = (): void => {
  const { connect } = useSubstrateApi();
  const mountedRef = useIsMountedRef();

  const tried = useRef(false);

  useEffect(() => {
    if (!mountedRef || tried.current || !connect) return;

    (async () => {
      tried.current = true;

      try {
        await connect();
      } catch (error) {
        warning(false, 'Connector is not activated');
      }
    })();
  }, [connect, mountedRef]);
};
