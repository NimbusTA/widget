import { Dark, Light } from '@lidofinance/lido-ui';
import { FC } from 'react';

import { ThemeTogglerStyle } from './themeTogglerStyles';
import { useThemeToggle } from '../../hooks';

export const ThemeToggler: FC = () => {
  const { toggleTheme, themeName } = useThemeToggle();

  return (
    <ThemeTogglerStyle onClick={toggleTheme}>
      {themeName === 'dark' ? <Light /> : <Dark />}
    </ThemeTogglerStyle>
  );
};
