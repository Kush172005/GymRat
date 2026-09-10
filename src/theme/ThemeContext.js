import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from './colors';

const ThemeContext = createContext({
  colors: darkColors,
  isDark: true,
  mode: 'system',
  setMode: () => {},
});

export function ThemeProvider({
  children,
  initialMode = 'system',
  onModeChange,
}) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState(initialMode);

  const isDark =
    mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  const setMode = (newMode) => {
    setModeState(newMode);
    onModeChange?.(newMode);
  };

  return (
    <ThemeContext.Provider value={{ colors, isDark, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
