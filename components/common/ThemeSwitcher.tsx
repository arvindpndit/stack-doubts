'use client';

import { FiSun, FiMoon } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  if (resolvedTheme === 'dark') {
    return (
      <FiSun
        className="text-4xl lg:text-3xl hover:cursor-pointer"
        onClick={() => setTheme('light')}
      />
    );
  }
  if (resolvedTheme === 'light') {
    return (
      <FiMoon
        className="text-4xl lg:text-3xl hover:cursor-pointer"
        onClick={() => setTheme('dark')}
      />
    );
  }
};

export default ThemeSwitcher;

