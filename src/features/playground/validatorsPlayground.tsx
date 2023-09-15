import { Block, OptionsSliderInputProps } from '@lidofinance/lido-ui';
import fp from 'lodash/fp';
import React, { FC, useCallback, useEffect, useState } from 'react';

import { liquidToken } from 'config';

export * from './types';

import { ValidatorsWrapper } from 'features/validators/validatorsBlockStyles';
import { numberWithCommas } from 'utils';

import PlaygroundList from './components/playgroundList';

import { PlaygroundRequestReturnType, useValidatorsPlayground } from './hooks';
import { PlaygroundWallet } from './playgroundWallet';
import { PlaygroundFiltersReturnType, PlaygroundData } from './types';

const usePlaygroundFilters = (
  data: PlaygroundRequestReturnType | undefined,
): PlaygroundFiltersReturnType => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeList, setActiveList] = useState<PlaygroundData[]>([]);

  const filtersList = fp.keys(data);

  const selectFilter = useCallback(
    (filter: string) => {
      setActiveList(fp.get(filter)(data));
      setActiveFilter(filter);
    },
    [data],
  );

  useEffect(() => {
    if (data) selectFilter(activeFilter || filtersList[0]);
  }, [activeFilter, data, filtersList, selectFilter]);

  return {
    selectFilter,
    filtersList,
    activeFilter,
    activeList,
  };
};

const amounts = [
  1, 10, 50, 100, 250, 500, 1000, 2000, 5000, 10000, 15000, 25000, 50000,
  150000, 300000, 600000, 1200000,
];

const amountMarks = amounts.map((amount) => ({
  value: amount,
  label: `${numberWithCommas(amount)} ${liquidToken}`,
})) as OptionsSliderInputProps['options'];

const freqMarks = [
  { value: 28, label: 'Weekly' },
  { value: 120, label: 'Monthly' },
  { value: 360, label: 'Quarterly' },
] as OptionsSliderInputProps['options'];

export const ValidatorsPlaygroundBlock: FC = () => {
  const [stakeValue, setStakeValue] = useState<number>(1);
  const [freqValue, setFreqValue] = useState<number>(28);

  const playgroundList = useValidatorsPlayground({
    frequency: freqValue,
    amount: stakeValue,
  });

  const { selectFilter, filtersList, activeFilter, activeList } =
    usePlaygroundFilters(playgroundList.data);

  const refreshCallback = useCallback(
    () => playgroundList.refetch(),
    [playgroundList],
  );
  return (
    <>
      <ValidatorsWrapper paddingLess>
        <PlaygroundWallet
          selectFilter={selectFilter}
          filtersList={filtersList}
          activeFilter={activeFilter}
          stakeValue={stakeValue}
          stakeMarks={amountMarks}
          onChangeStakeValue={(_: any, val: number) => setStakeValue(val)}
          frequencyValue={freqValue}
          onChangeFrequency={(_: any, val: number) => setFreqValue(val)}
          frequencyMarks={freqMarks}
          isLoading={playgroundList.isLoading}
        />

        <Block>
          <PlaygroundList
            error={playgroundList.error}
            onRefresh={refreshCallback}
            data={activeList}
            pending={playgroundList.isLoading}
          />
        </Block>
      </ValidatorsWrapper>
    </>
  );
};
