'use client';

import { createContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { AppTheme } from '@libs/internalTypes';
import { APP_THEME, LOCAL_STORAGE_THEME_KEY } from '@libs/constants';

type ThemeContextType = {
  theme: AppTheme;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: APP_THEME.LIGHT,
  toggleTheme: () => {},
  setLightTheme: () => {},
  setDarkTheme: () => {},
});

type Props = PropsWithChildren;

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<AppTheme>(APP_THEME.LIGHT);

  const toggleTheme = () => {
    if (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === APP_THEME.DARK) {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, APP_THEME.LIGHT);
    } else {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, APP_THEME.DARK);
    }
    setTheme((prevTheme) => (prevTheme === APP_THEME.LIGHT ? APP_THEME.DARK : APP_THEME.LIGHT));
  };

  const setLightTheme = () => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, APP_THEME.LIGHT);
    setTheme(APP_THEME.LIGHT);
  };

  const setDarkTheme = () => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, APP_THEME.DARK);
    setTheme(APP_THEME.DARK);
  };

  useEffect(() => {
    if (
      localStorage.theme === APP_THEME.DARK ||
      (!(LOCAL_STORAGE_THEME_KEY in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }, []);

  useEffect(() => {
    if (theme === APP_THEME.DARK) {
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
