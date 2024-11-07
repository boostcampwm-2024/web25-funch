'use client';

import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { AppTheme } from '@libs/internalTypes';
import { appTheme } from '@libs/constants';

type ThemeContextType = {
  theme: AppTheme;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: appTheme.LIGHT,
  toggleTheme: () => {},
  setLightTheme: () => {},
  setDarkTheme: () => {},
});

type Props = PropsWithChildren;

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<AppTheme>(appTheme.LIGHT);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === appTheme.LIGHT ? appTheme.DARK : appTheme.LIGHT));
  };

  const setLightTheme = () => setTheme(appTheme.LIGHT);

  const setDarkTheme = () => setTheme(appTheme.DARK);

  useEffect(() => {
    if (
      localStorage.theme === appTheme.DARK ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }, []);

  useEffect(() => {
    console.log('theme', theme);
    if (theme === appTheme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setLightTheme,
        setDarkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
