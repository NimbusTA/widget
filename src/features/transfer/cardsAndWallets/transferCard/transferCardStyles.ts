import styled from 'styled-components';

import { WarningIcon } from 'components/icons';
import TokenInput from 'components/tokenInput';

export const WarningIconStyled = styled(WarningIcon)`
  fill: ${({ theme }) => theme.colors.warning};
  height: 20px;
  width: 20px;
  margin-right: ${({ theme }) => theme.spaceMap.sm}px;
`;

export const TokenInputStyled = styled(TokenInput)`
  margin-bottom: ${({ theme }) => theme.spaceMap.md}px;
`;
