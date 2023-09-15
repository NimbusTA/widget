export enum ProjectType {
  FARM = 'Farm',
  DEX = 'DEX',
}

export type Button = {
  caption: string;
  link: string;
};

type Incentive = {
  amount: string;
  token: string;
};

export type DeFiListElement = {
  projectName: string;
  projectType: ProjectType;

  compound: boolean;

  tokens: string[];

  tokenIconCaption: string;

  isActive: boolean;

  interestRate: string;
  tvl: string;

  incentives: Incentive[];

  aprDescription: string;

  buttons?: Button[];
};
