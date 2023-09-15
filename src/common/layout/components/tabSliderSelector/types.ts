import React from 'react';

export type TabSliderSelectorStateProps = {
  left: number;
  right: number;
  reverse: boolean;
  noAnimation: boolean;
};

export type TabSliderSelectorOptionProps = {
  tab: React.ReactNode;
  clickable: boolean;
  title?: string;
};

export type TabSliderSelectorProps = {
  value: number;
  focusable?: boolean;
  options: TabSliderSelectorOptionProps[];
  onChange?: (id: number) => void;
};
