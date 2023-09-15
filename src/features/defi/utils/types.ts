import { Button, ProjectType } from 'features/defi/types';

export type DeFiResponseElement = {
  projectId: number;
  projectName: string;
  projectType: ProjectType;

  compound: boolean;

  token1Name: string;
  token2Name?: string | null;

  tokenItemCaption: string;

  isActive: boolean;

  interestRate: string;
  tvl: string;

  incentiveTokenNames: string[];
  incentiveTokenAmounts: string[];

  buttons?: Button[];
};

export type DeFiListResponse = {
  status: number;
  message: string;
  data: {
    nProjects: number;
    projects: DeFiResponseElement[];
  };
};
