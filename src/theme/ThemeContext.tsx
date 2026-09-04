import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, Colors } from './colors';

export type ThemeMode = 'system' | 'dark' | 'light';

interface ThemeContextValue {
  colors: Colors;
  isDark: boolean;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: darkColors,
  isDark: true,
  mode: 'system',
  setMode: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
  initialMode?: ThemeMode;
  onModeChange?: (mode: ThemeMode) => void;
}

export function ThemeProvider({
  children,
  initialMode = 'system',
  onModeChange,
}: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(initialMode);

  const isDark =
    mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  const setMode = (newMode: ThemeMode) => {
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
