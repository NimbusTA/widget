import { Link } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const BoldText = styled.p`
  font-weight: 800;
  font-size: ${({ theme }) => theme.fontSizesMap.md}px;
  line-height: 1.5em;
  margin-bottom: 4px;
`;
export const LightText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 20px;
`;
export const InstructionText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
  margin-top: 24px;
`;
export const ExplorerLink = styled(Link)`
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 38px;
  font-size: ${({ theme }) => theme.fontSizesMap.xxs}px;
  line-height: 1.6em;
  font-weight: 500;
`;
export const ModalIconStyle = styled.div`
  margin-bottom: ${({ theme }) => theme.spaceMap.lg}px;
`;
