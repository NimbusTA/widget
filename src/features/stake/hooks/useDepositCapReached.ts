import { BigNumber } from '@ethersproject/bignumber';

import { useLidoSWR } from '@lido-sdk/react';
import { ToastError } from '@lidofinance/lido-ui';

import { useEffect, useMemo } from 'react';

import { useLiquidContractWeb3 } from 'contracts';

export const useDepositCapReached = (shouldFetch = true): boolean => {
  const liquidContractWeb3 = useLiquidContractWeb3();

  const fundRaisedRes = useLidoSWR<BigNumber, Error>(
    liquidContractWeb3 && shouldFetch ? 'fundRaisedBalance' : null,
    liquidContractWeb3 && (() => liquidContractWeb3.fundRaisedBalance()),
  );

  const depositCapRes = useLidoSWR<BigNumber, Error>(
    liquidContractWeb3 && shouldFetch ? 'depositCap' : null,
    liquidContractWeb3 && (() => liquidContractWeb3.depositCap()),
  );

  const capReached = useMemo(
    () =>
      !!fundRaisedRes &&
      !!fundRaisedRes.data &&
      !!depositCapRes &&
      !!depositCapRes.data &&
      fundRaisedRes.data.gte(depositCapRes.data),
    [depositCapRes, fundRaisedRes],
  );

  const toastId = 'DepositCapReached';
  const notify = () =>
    ToastError(
      'Warning! Nimbus running on beta, maximum capacity reached. Limitations will be removed soon, stay tuned!',
      {
        toastId,
        position: 'bottom-right',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      },
    );

  // const update = () => toast.update(toastId, { autoClose: 5000 });

  useEffect(() => {
    if (capReached) notify();
    // if (!capReached) update();
  }, [capReached]);

  return capReached;
};
