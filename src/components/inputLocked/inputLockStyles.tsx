import styled from 'styled-components';

export const LockWrapper = styled.span`
  position: relative;
  line-height: 0;
  padding: 4px;
  display: inline-block;
  vertical-align: top;
  margin-right: 4px;
  cursor: default;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadiusesMap.sm}px;
  :first-child {
    margin-left: 0;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.1;
    border-radius: inherit;
  }
`;
