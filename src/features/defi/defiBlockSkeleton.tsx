import { StackItem } from '@lidofinance/lido-ui';
import styled, { keyframes } from 'styled-components';

export const translation = keyframes`
  100% {
    background-position: 0 0;
  }
`;

export const DeFiBlockSkeleton = styled(StackItem)`
  --loader-color: currentColor;

  position: relative;
  height: 364px;
  min-width: 300px;

  &::after {
    border-radius: 20px;
    height: 100%;
    width: 100%;
    content: '';
    display: block;

    opacity: 0.05;
    animation: ${translation} 2s infinite;
    background-size: 300% 100%;
    background-position: 100% 0;
    background-image: linear-gradient(
      90deg,
      var(--loader-color) 0,
      var(--loader-color) 33.33%,
      transparent 44.44%,
      transparent 55.55%,
      var(--loader-color) 66.66%,
      var(--loader-color) 100%
    );
  }
`;
