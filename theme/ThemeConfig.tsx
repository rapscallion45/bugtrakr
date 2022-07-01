import { FC, useMemo } from 'react';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import shape from './shape';
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

interface ThemeConfigProps {
  emotionCache?: any;
  children?: any;
}

const ThemeConfig: FC<ThemeConfigProps> = function ThemeConfig({ emotionCache, children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  // @ts-ignore
  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeConfig;
