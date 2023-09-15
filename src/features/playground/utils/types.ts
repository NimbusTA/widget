export type PlaygroundResponseData = {
  validator_key: string;
  apr: number;
  commission: number;
  activity: number;
  era_points: number;
  nominated_stake: number;
};

export type PlaygroundResponse = {
  data: {
    [freqAmountFilters: string]: {
      [listTypeFilters: string]: {
        [index: string]: PlaygroundResponseData;
      };
    };
  };
};
