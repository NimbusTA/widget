import { Block, HStack, Text } from '@lidofinance/lido-ui';

import fp from 'lodash/fp';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Filter } from 'common/controls';

import { DeFiBlockSkeleton } from './defiBlockSkeleton';
import { DefiComponent } from './defiComponent';
import { useDeFi } from './hooks';
import { DeFiListElement, ProjectType } from './types';
import { mapProjectTypeToProjectDescription } from './utils';

const AllFilter = 'All';

export type FilteredDeFiList = {
  [p: string]: DeFiListElement[];
};

const useDeFiFilters = () => {
  const [activeFilter, setActiveFilter] = useState<string>(AllFilter);
  const [activeList, setActiveList] = useState<DeFiListElement[]>([]);

  const deFiList = useDeFi();

  const [filteredData, filtersList]: [FilteredDeFiList, string[]] =
    useMemo(() => {
      if (deFiList.data && deFiList.data.length > 0) {
        const data = fp.groupBy<DeFiListElement>('projectType')(deFiList.data);
        const typeFilters = fp.keys(data);
        return [
          { [AllFilter]: deFiList.data, ...data },
          [AllFilter, ...typeFilters],
        ];
      } else {
        return [{ [AllFilter]: deFiList.data || [] }, [AllFilter]];
      }
    }, [deFiList.data]);

  const selectFilter = useCallback(
    (filter: string) => {
      setActiveList(fp.get(filter)(filteredData));
      setActiveFilter(filter);
    },
    [filteredData],
  );

  useEffect(() => {
    if (activeList.length === 0 && deFiList.data && deFiList.data?.length > 0) {
      setActiveList(deFiList.data);
      setActiveFilter(AllFilter);
    }
  }, [activeList.length, deFiList.data]);

  return {
    selectFilter,
    filtersList,
    activeFilter,
    activeList,
    loading: deFiList.isLoading,
    error: deFiList.error,
  };
};

export const DefiBlock: FC = () => {
  const {
    selectFilter,
    filtersList,
    activeFilter,
    activeList,
    loading,
    error,
  } = useDeFiFilters();

  return (
    <>
      <Block style={{ paddingTop: 20, paddingBottom: 20, marginBottom: 24 }}>
        <HStack spacing="xs">
          <Text size="xs" strong>
            Filter:
          </Text>
          {filtersList.map((filter) => (
            <Filter
              key={`filter-${filter}`}
              isActive={filter === activeFilter}
              onClick={() => selectFilter(filter)}
              variant="outlined"
              color="secondary"
              help={
                filter !== AllFilter
                  ? mapProjectTypeToProjectDescription(filter as ProjectType)
                  : null
              }
            >
              {filter}
            </Filter>
          ))}
        </HStack>
      </Block>
      {error ? (
        <Block>Can&apos;t get DeFi projects.</Block>
      ) : (
        <HStack
          align="flex-start"
          justify="flex-start"
          spacing="xxl"
          wrap="wrap"
        >
          {loading ? (
            <>
              <DeFiBlockSkeleton basis="25%" />
              <DeFiBlockSkeleton basis="25%" />
              <DeFiBlockSkeleton basis="25%" />
              <DeFiBlockSkeleton basis="25%" />
            </>
          ) : (
            activeList?.map((item, index) => (
              <DefiComponent
                key={`df-${item.projectName}-${index}`}
                {...item}
              />
            ))
          )}
        </HStack>
      )}
    </>
  );
};
