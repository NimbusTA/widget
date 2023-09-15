import { Identicon, ArrowBottom } from '@lidofinance/lido-ui';
import styled, { css } from 'styled-components';

import { IdenticonBadgeColors } from './types';

const colors = {
  background: css`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textSecondary};
  `,
  accent: css`
    background: ${({ theme }) => theme.colors.accentDarken};
    color: ${({ theme }) => theme.colors.accentContrast};
  `,
};

export const IdenticonBadgeStyle = styled.div<{ $color: IdenticonBadgeColors }>`
  border-radius: 1000px;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  ${({ $color }) => colors[$color]}
`;

export const IdenticonAddressStyle = styled.div`
  font-weight: 500;
  margin: 0 6px;
  text-align: center;
  &:empty {
    display: none;
  }
`;

export const IdenticonStyle = styled(Identicon)`
  flex-shrink: 0;
`;

export const IdenticonArrowStyle = styled(ArrowBottom)`
  flex-shrink: 0;
`;
