import { External, Block, Text, Tooltip } from '@lidofinance/lido-ui';
import React, { FC, useMemo } from 'react';

import SystemIcon from 'assets/icons/system.svg';
import { DEFAULT_VALUE } from 'config';
import { mapProjectTypeToIncentives } from 'features/defi/utils';
import { useAPR } from 'hooks';
import { numberWithCommas, openInNewTab } from 'utils';

import {
  AccentText,
  AprText,
  ApyPercent,
  ApyWrapper,
  ButtonIconRight,
  DeFiBlockWrapper,
  PrimaryColoredSpan,
  ProjectLogo,
  ProjectText,
  ProjectTokens,
  RainbowBackground,
  RewardsList,
  SecondLogo,
  TokenLogo,
  TokenText,
  TooltipItem,
  Tvl,
} from './styles';
import { DeFiListElement } from './types';

type NumberValueProps = {
  amount: string;
  token?: string;
  approx?: boolean;
  decimalsCount?: number;
};

const NumberValue: FC<NumberValueProps> = ({
  amount,
  approx,
  token,
  decimalsCount,
}) => {
  const value = useMemo(() => {
    const numberAmount = parseFloat(amount);
    return isNaN(numberAmount)
      ? amount
      : numberWithCommas(numberAmount, decimalsCount);
  }, [amount, decimalsCount]);

  const prefix = !approx ? '' : '≈ ';

  return (
    <>
      {prefix}
      {value}
      {token ? <>&nbsp;{token}</> : null}
    </>
  );
};

type DefaultedValueType = number | typeof DEFAULT_VALUE;

const formatAPR = (apr: DefaultedValueType | undefined) =>
  apr && apr !== DEFAULT_VALUE ? numberWithCommas(apr, 1) + '%' : DEFAULT_VALUE;

const DeFiBlockComponent: FC<DeFiListElement> = ({
  projectType,
  projectName,
  tokens,
  tokenIconCaption,

  buttons,
  compound,

  interestRate,

  incentives,

  aprDescription,

  tvl,
}) => {
  const APRYString = `AP${compound ? 'Y' : 'R'}`;

  const Incentives = useAPR(compound);
  const ProjectIncentives =
  Incentives !== DEFAULT_VALUE
      ? mapProjectTypeToIncentives(projectType, Incentives)
      : DEFAULT_VALUE;

  const projectInterestRate = parseFloat(interestRate);
  const projectIncentives =
    !isNaN(projectInterestRate) && ProjectIncentives !== DEFAULT_VALUE
      ? projectInterestRate + ProjectIncentives
      : !isNaN(projectInterestRate) && ProjectIncentives === DEFAULT_VALUE
      ? projectInterestRate
      : ProjectIncentives;

  return (
    <DeFiBlockWrapper basis="25%">
      <RainbowBackground />
      <Block style={{ height: 300 }}>
        <ApyWrapper>
          <div>
            <TokenText size="xxs">{projectType}</TokenText>
            <ProjectTokens>
              {tokens && tokens.length > 0 && (
                <TokenLogo iconKey={tokens[0]} name={tokens[0]} />
              )}
              {tokens &&
                tokens.length > 1 &&
                tokens
                  .slice(1)
                  .map((token) => (
                    <SecondLogo
                      key={`token-${token}`}
                      iconKey={token}
                      name={token}
                    />
                  ))}
              <ProjectText size="xxs" strong>
                {tokenIconCaption}
              </ProjectText>
            </ProjectTokens>

            {tvl && (
              <Tvl size="xxs">
                $<NumberValue amount={tvl} token="TVL" />
              </Tvl>
            )}
          </div>

          <Tooltip
            placement="bottomLeft"
            title={<AccentText size="xxs">{projectName}</AccentText>}
          >
            <ProjectLogo iconKey={projectName} name={projectName} />
          </Tooltip>
        </ApyWrapper>

        <Text style={{ marginBottom: 0 }} size="xxs">
          Total {APRYString}
        </Text>
        <ApyPercent>
          <AprText size="lg" color="success" strong>
            {formatAPR(projectIncentives)}
          </AprText>
          {Array.isArray(incentives) && incentives.length > 0 && (
            <Tooltip
              title={
                <>
                  <RewardsList>
                    {incentives.map(({ amount, token }, i2) => (
                      <TooltipItem size="xxs" key={`df-${amount}-t-${i2}`}>
                        <TokenLogo iconKey={token} name={token} />
                        <NumberValue
                          approx
                          amount={amount}
                          token={`${token}/day rewards`}
                        />
                      </TooltipItem>
                    ))}
                  </RewardsList>
                  <AccentText size="xxs">{aprDescription}</AccentText>
                </>
              }
            >
              <img src={SystemIcon} alt="" />
            </Tooltip>
          )}
        </ApyPercent>
        <Text style={{ marginBottom: 24 }} size="xxs">
          {!isNaN(projectInterestRate) && (
            <>
              Protocol {APRYString}{' '}
              <PrimaryColoredSpan>
                {formatAPR(projectInterestRate)}
              </PrimaryColoredSpan>{' '}
              +{' '}
            </>
          )}{' '}
          Nimbus {APRYString}{' '}
          <PrimaryColoredSpan>
            {formatAPR(ProjectIncentives)}
          </PrimaryColoredSpan>
        </Text>

        {buttons?.map(({ caption, link }, index) => (
          <ButtonIconRight
            key={caption}
            icon={<External />}
            variant={index % 2 !== 0 ? 'outlined' : 'filled'}
            onClick={() => openInNewTab(link)}
            fullwidth
            size="sm"
          >
            {caption}
          </ButtonIconRight>
        ))}
      </Block>
    </DeFiBlockWrapper>
  );
};

export const DefiComponent = React.memo(DeFiBlockComponent);
