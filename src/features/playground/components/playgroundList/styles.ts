import styled from 'styled-components';

export const ListHeadingWrapper = styled.div`
  padding: 0 0 28px 0;

  > p + p {
    margin-top: ${({ theme }) => theme.spaceMap.sm}px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0;
  }
`;
