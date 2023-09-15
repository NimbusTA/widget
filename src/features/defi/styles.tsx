import {
  ButtonIcon,
  StackItem,
  Text,
  withStyledSystem,
} from '@lidofinance/lido-ui';
import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Icon } from './icons';

export const AccentText = styled(Text)`
  color: ${({ theme }) => theme.colors.accentContrast};
`;

export const TooltipItem = styled(AccentText)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;

  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
  }

  > div {
    margin-right: 6px;
  }
`;

export const StyledSpan = withStyledSystem('span');

export const PrimaryColoredSpan: FC<PropsWithChildren> = ({ children }) => (
  <StyledSpan color="primary">{children}</StyledSpan>
);

export const RewardsList = styled.div`
  border-bottom: 1px solid #3d3d43;
  padding-bottom: 12px;
  margin-bottom: ${({ theme }) => theme.spaceMap.sm}px;
`;

export const DeFiBlockWrapper = styled(StackItem)`
  position: relative;

  min-width: 300px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-grow: 1;
  }

  & > div:first-child {
    opacity: 0;

    background: conic-gradient(
      #56f2ff -0.38deg,
      #4a8cea 51.89deg,
      #70c794 110.07deg,
      #ffe336 170.63deg,
      #ff8072 232.5deg,
      #4b96ec 296.51deg,
      #56f2ff 359.62deg,
      #4a8cea 411.89deg
    );
    filter: blur(16px);

    transition: opacity 150ms ease;
    transition-property: opacity;
  }

  &:hover > div:first-child {
    opacity: 0.5;
  }
`;

export const RainbowBackground = styled.div`
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;
  z-index: -1;
`;

export const ProjectTokens = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  margin-bottom: ${({ theme }) => theme.spaceMap.sm}px;
`;

export const ProjectText = styled(Text)`
  margin-left: ${({ theme }) => theme.spaceMap.sm}px;
`;

export const TokenLogo = styled(Icon)`
  height: 24px;
  width: 24px;

  > svg {
    height: 100%;
    width: 100%;
  }
`;

export const SecondLogo = styled(TokenLogo)`
  margin-left: ${({ theme }) => -theme.spaceMap.xs}px;
`;

export const ApyWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const TokenText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spaceMap.sm}px;
`;

export const ProjectLogo = styled(Icon)`
  height: 32px;
  width: 32px;

  position: absolute;
  right: 0;
  top: 0;

  > svg {
    height: 100%;
    width: 100%;
  }
`;

export const ApyPercent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;

  color: ${({ theme }) => theme.colors.success};
  margin-bottom: 2px;
  margin-top: 2px;
`;

export const Tvl = styled(Text)`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spaceMap.xl}px;
`;

export const AprText = styled(Text)`
  margin-right: ${({ theme }) => theme.spaceMap.sm}px;
`;

export const ButtonIconRight = styled(ButtonIcon)`
  margin-bottom: 12px;

  &:last-of-type {
    margin-bottom: 0;
  }

  span > span {
    flex-direction: row-reverse;

    &:last-child {
      margin-left: 0;
      margin-right: 10px;
    }
  }
`;
