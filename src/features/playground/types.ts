export type ValidatorLinkProps = {
  validatorAddress: string;
  link: string;
  fullInfo?: boolean;
};

export type PlaygroundData = {
  validator: string;
  apr: number;
  commission: number;
  activity: number;
  points: number;
  stake: number;
};

export type PlaygroundFiltersReturnType = {
  selectFilter: (filter: string) => void;
  filtersList: string[];
  activeFilter: string | null;
  activeList: PlaygroundData[];
};
