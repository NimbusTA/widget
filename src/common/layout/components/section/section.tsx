import {
  SectionStyle,
  SectionHeaderStyle,
  SectionTitleStyle,
  SectionHeaderDecoratorStyle,
  SectionContentStyle,
} from './sectionStyles';
import { SectionComponent } from './types';

export const Section: SectionComponent = (props) => {
  const { title, headerDecorator, children, ...rest } = props;
  const hasDecorator = !!headerDecorator;

  return (
    <SectionStyle {...rest}>
      <SectionHeaderStyle>
        <SectionTitleStyle>{title}</SectionTitleStyle>
        {hasDecorator && (
          <SectionHeaderDecoratorStyle>
            {headerDecorator}
          </SectionHeaderDecoratorStyle>
        )}
      </SectionHeaderStyle>
      <SectionContentStyle>{children}</SectionContentStyle>
    </SectionStyle>
  );
};
