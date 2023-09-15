import { Input } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const TokenInputStyle = styled(Input)<{
  $fullwidth: boolean | undefined;
}>`
  z-index: 1;
`;
