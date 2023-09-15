import {
  BlockProps,
  OptionsSlider,
  OptionsSliderInputProps,
  StackItem,
  ThemeProvider,
} from '@lidofinance/lido-ui';
import fp from 'lodash/fp';
import React, { FC } from 'react';

import { WalletCardTitleStyle } from 'common/wallets';

import { themeDark } from 'styles';

import { playgroundFiltersMap } from './playgroundFiltersMap';
import {
  DarkFilter,
  InputFiltersStyle,
  StyledLoader,
  WalletCardStyle,
  WalletFilterRowStyle,
} from './styles';
import { PlaygroundFiltersReturnType } from './types';

type PlaygroundWalletProps = BlockProps &
  Pick<
    PlaygroundFiltersReturnType,
    'selectFilter' | 'filtersList' | 'activeFilter'
  > & {
    stakeValue: OptionsSliderInputProps['value'];
    onChangeStakeValue: OptionsSliderInputProps['onChange'];
    stakeMarks: OptionsSliderInputProps['options'];

    frequencyValue: OptionsSliderInputProps['value'];
    onChangeFrequency: OptionsSliderInputProps['onChange'];
    frequencyMarks: OptionsSliderInputProps['options'];

    isLoading: boolean;
  };

export const PlaygroundWallet: FC<PlaygroundWalletProps> = ({
  activeFilter,
  selectFilter,
  filtersList,

  stakeValue,
  onChangeStakeValue,
  stakeMarks,

  frequencyValue,
  frequencyMarks,
  onChangeFrequency,

  isLoading,
  ...props
}) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ThemeProvider theme={themeDark}>
      <WalletCardStyle {...props}>
        <InputFiltersStyle spacing="md">
          <StackItem basis="50%">
            <OptionsSlider
              options={stakeMarks}
              value={stakeValue}
              onChange={onChangeStakeValue}
            />
          </StackItem>
          <StackItem basis="50%">
            <OptionsSlider
              options={frequencyMarks}
              value={frequencyValue}
              onChange={onChangeFrequency}
            />
          </StackItem>
        </InputFiltersStyle>

        <WalletFilterRowStyle>
          <WalletCardTitleStyle>Validator filter</WalletCardTitleStyle>
          {isLoading ? (
            <StyledLoader size="medium" />
          ) : (
            <>
              {filtersList.map((filter: string) =>
                fp.has(filter, playgroundFiltersMap) ? (
                  <DarkFilter
                    key={`filter-${filter}`}
                    isActive={filter === activeFilter}
                    onClick={() => selectFilter(filter)}
                    variant="outlined"
                    color="secondary"
                  >
                    {fp.get(filter, playgroundFiltersMap)}
                  </DarkFilter>
                ) : null,
              )}
            </>
          )}
        </WalletFilterRowStyle>
      </WalletCardStyle>
    </ThemeProvider>
  );
};
