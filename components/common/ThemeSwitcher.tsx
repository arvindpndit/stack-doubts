'use client';

import { TbSun, TbMoon } from 'react-icons/tb';
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
      <TbSun
        className="text-2xl md:text-3xl hover:cursor-pointer "
        onClick={() => setTheme('light')}
      />
    );
  }
  if (resolvedTheme === 'light') {
    return (
      <TbMoon
        className="text-2xl md:text-3xl hover:cursor-pointer "
        onClick={() => setTheme('dark')}
      />
    );
  }
};

export default ThemeSwitcher;

