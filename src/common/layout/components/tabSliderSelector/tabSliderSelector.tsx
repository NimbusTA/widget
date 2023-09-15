import React, { PureComponent } from 'react';

import {
  TabSliderHandlerStyle,
  TabSliderLabelStyle,
  TabSliderWrapperStyle,
} from './tabSliderSelectorStyles';
import { TabSliderSelectorProps, TabSliderSelectorStateProps } from './types';

export class TabSliderSelector extends PureComponent<
  TabSliderSelectorProps,
  TabSliderSelectorStateProps
> {
  state = {
    left: 0,
    right: 0,
    reverse: false,
    noAnimation: true,
  };

  container = React.createRef<HTMLDivElement>();

  elements: HTMLDivElement[] = [];

  componentDidMount(): void {
    this.updatePositioner(this.props.options.length / 2, true);
  }

  componentDidUpdate({ value }: TabSliderSelectorProps): void {
    this.updatePositioner(value);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  updatePositioner = (previous: number, noAnimation = false) =>
    setTimeout(() => {
      const { value } = this.props;
      if (!this.elements[value] || !this.container.current) return;

      const { offsetLeft, clientWidth } = this.elements[value];
      const { clientWidth: containerWidth } = this.container.current;
      const left = offsetLeft / containerWidth;
      const right = 1 - (offsetLeft + clientWidth) / containerWidth;
      this.setState({
        left,
        right,
        reverse: value < previous,
        noAnimation,
      });
    }, 10);

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setIndex = (idx: number) => () => {
    if (this.props.onChange) this.props.onChange(idx);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setElementRef = (idx: number) => (ref: HTMLDivElement) => {
    this.elements[idx] = ref;
  };

  render(): JSX.Element {
    const { focusable = true, options } = this.props;
    const { left, right, reverse, noAnimation } = this.state;
    this.elements.length = options.length;
    return (
      <TabSliderWrapperStyle ref={this.container}>
        <TabSliderHandlerStyle
          left={`${left * 100}%`}
          right={`${right * 100}%`}
          reverse={reverse}
          noAnimation={noAnimation}
        />
        {options.map(({ tab, clickable, title = '' }, idx) =>
          clickable ? (
            <TabSliderLabelStyle
              key={idx}
              ref={this.setElementRef(idx)}
              tabIndex={focusable ? 0 : -1}
              onClick={this.setIndex(idx)}
              title={title}
              opacity={idx === this.props.value ? 1 : 0.5}
            >
              {tab}
            </TabSliderLabelStyle>
          ) : (
            <TabSliderLabelStyle
              opacity={idx === this.props.value ? 1 : 0.5}
              key={idx}
              ref={this.setElementRef(idx)}
            >
              {tab}
            </TabSliderLabelStyle>
          ),
        )}
      </TabSliderWrapperStyle>
    );
  }
}
