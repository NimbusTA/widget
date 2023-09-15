import styled from 'styled-components';

export const TabSliderWrapperStyle = styled.div`
  height: 44px;

  background-color: ${({ theme }) => theme.colors.backgroundDarken};
  border-radius: 22px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const TabSliderHandlerStyle = styled.div<{
  left: string;
  right: string;
  reverse: boolean;
  noAnimation: boolean;
}>`
  left: calc(${({ left }) => left} + 2px);
  right: calc(${({ right }) => right} + 2px);

  transition: left 150ms ease 100ms, right 150ms ease;

  ${({ reverse }) =>
    reverse &&
    `transition:
            left 150ms ease,
            right 150ms ease 100ms;`}

  ${({ noAnimation }) => noAnimation && 'transition: none;'}          

  height: 40px;
  background-color: ${({ theme }) => theme.colors.foreground};
  border-radius: 20px;
  position: absolute;
  top: 2px;
  z-index: 1;
`;

export const TabSliderLabelStyle = styled.div<{ opacity: number }>`
  z-index: 2;
  padding: 0 ${({ theme }) => theme.spaceMap.xxl}px;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.3s ease 0s;
  line-height: 1.6em;
`;
