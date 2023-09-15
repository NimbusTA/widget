import {
  themeLight as themeBaseLight,
  themeDark as themeBaseDark,
} from '@lidofinance/lido-ui';

import theme from './base';

export const themeLight = {
  ...themeBaseLight,
  ...theme,
  colors: {
    ...themeBaseLight.colors,
    ...theme.colors,

    background: '#f2f2f2',
    backgroundDarken: '#dadfe4',
    backgroundSecondary: '#EFF2F6',
  },
};

export const themeDark = {
  ...themeBaseDark,
  ...theme,
  colors: {
    ...themeBaseDark.colors,
    ...theme.colors,
  },
};
