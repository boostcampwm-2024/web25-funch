'use client';

import HeaderControlButton from './HeaderControlButton';
import useTheme from '@hooks/useThemeContext';

const ThemeController = () => {
  const { theme, toggleTheme } = useTheme();
  return <HeaderControlButton componentType={theme} onClick={toggleTheme} />;
};

export default ThemeController;
