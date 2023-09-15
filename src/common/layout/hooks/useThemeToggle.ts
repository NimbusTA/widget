import { useContext } from 'react';

import { ThemeToggleContext, ThemeContext } from 'providers';

export const useThemeToggle = (): ThemeContext => {
  return useContext(ThemeToggleContext);
};
