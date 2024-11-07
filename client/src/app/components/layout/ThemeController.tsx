'use client';

import { useState } from 'react';
import HeaderControlButton from './HeaderControlButton';

const ThemeController = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <>
      {theme === 'light' ? (
        <HeaderControlButton componentType="DARK" onClick={() => setTheme('dark')} />
      ) : (
        <HeaderControlButton componentType="LIGHT" onClick={() => setTheme('light')} />
      )}
    </>
  );
};

export default ThemeController;
