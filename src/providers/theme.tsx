import { useLocalStorage } from '@lido-sdk/react';
import {
  Theme,
  ThemeProvider as SourceProvider,
  useSystemTheme,
} from '@lidofinance/lido-ui';
import {
  FC,
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
  PropsWithChildren,
} from 'react';

import BackgroundGradient from 'components/backgroundGradient';

import { STORAGE_THEME_KEY } from 'config';
import { GlobalStyle, themeLight, themeDark } from 'styles';

export type ThemeName = 'light' | 'dark';

export type ThemeContext = {
  toggleTheme: () => void;
  themeName: ThemeName;
};

const themeMap: Record<ThemeName, Theme> = {
  light: themeLight,
  dark: themeDark,
};

export const ThemeToggleContext = createContext({} as ThemeContext);

const DEFAULT_THEME = 'light';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeLS, setThemeLS] = useLocalStorage<ThemeName | null>(
    STORAGE_THEME_KEY,
    null,
  );
  const systemTheme = useSystemTheme();

  /*
   * The first rendering is always with a light theme. After that useEffect will replace the theme with a custom one
   * This is necessary for correct Next.js hydration
   */
  const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME);

  useEffect(() => {
    if (themeLS) {
      setThemeName(themeLS);
    } else if (systemTheme) {
      setThemeName(systemTheme);
    }
  }, [themeLS, systemTheme]);

  // remember the theme on manual toggle, ignore system theme changes
  const toggleTheme = useCallback(() => {
    setThemeLS((current) => (current === 'light' ? 'dark' : 'light'));
  }, [setThemeLS]);

  const value = useMemo(
    () => ({
      toggleTheme,
      themeName,
    }),
    [themeName, toggleTheme],
  );

  return (
    <ThemeToggleContext.Provider value={value}>
      <SourceProvider theme={themeMap[themeName]}>
        <GlobalStyle />
        <BackgroundGradient width={1560} height={784} />
        {children}
      </SourceProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProvider;
