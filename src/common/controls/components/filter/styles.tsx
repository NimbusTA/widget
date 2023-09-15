import { Button, ButtonProps } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const StyledFilter = styled(Button)<
  ButtonProps & { $help?: string | null }
>`
  position: relative;
  display: inline-block;
  overflow: visible;

  border-radius: 46px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }

  &::before {
    border: 1px solid ${({ theme }) => theme.colors.accentBorder};
  }

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};

    &::before {
      border: 1px solid ${({ theme }) => theme.colors.accentBorderHover};
    }
  }

  box-shadow: none;

  padding: 6px 16px;
  margin-left: 12px;
  min-width: unset;

  font-size: 12px;
  font-weight: 400;

  &:disabled {
    background-color: rgba(168, 92, 525, 0.1);
    color: ${({ theme }) => theme.colors.primary};

    opacity: 1;

    &::before {
      border: 1px solid ${({ theme }) => theme.colors.primary};
    }

    padding-left: 28px;

    svg {
      position: absolute;
      left: -24px;
      top: -4px;
    }
  }

  &::after {
    color: ${({ theme }) => theme.colors.accentContrast};

    content: '${({ $help }) => $help}';
    position: absolute;
    display: ${({ $help }) => ($help ? 'block' : 'none')};

    ${({ theme }) => theme.mediaQueries.md} {
      display: none;
    }

    white-space: normal;

    left: 12px;
    margin-top: 5px;

    z-index: 1;

    padding: 12px;
    background: ${({ theme }) => theme.colors.accent};

    font-size: ${({ theme }) => theme.fontSizesMap.xs};
    line-height: 20px;
    text-align: left;

    width: 256px;
    border-radius: ${({ theme }) => theme.borderRadiusesMap.md}px;
    box-shadow: ${({ theme }) =>
      `${theme.boxShadows.sm} ${theme.colors.shadowLight}`};
    pointer-events: none;

    transform: translateY(-6px);
    opacity: 0;

    transition: opacity 150ms ease;
    transition-property: opacity, transform;
  }

  &:hover {
    &::after {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
`;
