import { BigNumber } from '@ethersproject/bignumber';
import { useEffect, useState } from 'react';

export const useMemoField = (
  data?: BigNumber | string | number,
  update?: () => void,
): void => {
  const [prevData, setPrevData] = useState(data);

  useEffect(() => {
    if (data !== prevData) {
      update && update();
      setPrevData(data);
    }
  }, [data, prevData, update]);
};
