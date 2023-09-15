import { DeFiListElement, ProjectType } from 'features/defi/types';

import { DeFiResponseElement } from './types';

export const mapProjectTypeToUi = (
  projectRow: DeFiResponseElement,
): DeFiListElement => {
  const incentives = projectRow.incentiveTokenNames.map((token, index) => ({
    token,
    amount: projectRow.incentiveTokenAmounts[index],
  }));

  const commonFields = {
    projectType: projectRow.projectType,

    projectName: projectRow.projectName,

    compound: projectRow.compound,

    tokenIconCaption: projectRow.tokenItemCaption,

    isActive: projectRow.isActive,

    interestRate: projectRow.interestRate,
    tvl: projectRow.tvl,

    incentives,

    aprDescription: mapProjectTypeToApyDescription(projectRow.projectType),

    buttons: projectRow.buttons,
  };

  switch (projectRow.projectType) {
    case ProjectType.DEX:
      return {
        ...commonFields,

        tokens: projectRow.token2Name
          ? [projectRow.token1Name, projectRow.token2Name]
          : [projectRow.token1Name],
      };
    case ProjectType.FARM:
      return {
        ...commonFields,

        tokens: projectRow.token1Name.split('-'),
      };

    default:
      return {
        ...commonFields,

        projectType: projectRow.projectType,

        tokens: projectRow.token2Name
          ? [projectRow.token1Name, projectRow.token2Name]
          : [projectRow.token1Name],
      };
  }
};

export const mapProjectTypeToIncentives = (
  projectType: ProjectType,
  incentives: number,
): number => {
  switch (projectType) {
    case ProjectType.DEX:
    case ProjectType.FARM:
      return incentives / 2;

    default:
      return incentives;
  }
};

export const mapProjectTypeToApyDescription = (
  projectType: ProjectType,
): string => {
  switch (projectType) {
    case ProjectType.DEX:
      return 'Displayed APR is based on the current protocol APR plus current Nimbus liquid staking APR. For DEX/AMM liquidity only 50% of Nimbus liquid staking APR is added since we assume you provide assets at 1:1 ratio and only half of staked assets get additional yield.';

    case ProjectType.FARM:
      return 'Displayed APR is based on the current protocol APR plus current Nimbus liquid staking APR. For FARM liquidity only 50% of Nimbus liquid staking APR is added since we assume you provide assets at 1:1 ratio and only half of staked assets get additional yield.';

    default:
      return 'Displayed APR is based on the current protocol APR plus current Nimbus liquid staking APR.';
  }
};

export const mapProjectTypeToProjectDescription = (
  projectType: ProjectType,
): string | null => {
  switch (projectType) {
    case ProjectType.DEX:
      return 'Provide your tokens as liquidity to decentralized exchange pools and get additional yield';

    case ProjectType.FARM:
      return 'Automate the process of leveraging and collecting the generated rewards on your behalf to maximize profits';

    default:
      return null;
  }
};
