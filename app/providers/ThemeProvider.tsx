'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { THEME } from '@/config/design';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(THEME.defaultMode);

  useEffect(() => {
    const stored = THEME.disableToggle ? null : localStorage.getItem('jwc-theme') as Theme | null;
    // If the config's defaultMode changed since last visit, clear the stale stored value
    const configChanged = localStorage.getItem('jwc-theme-default') !== THEME.defaultMode;
    if (configChanged) {
      localStorage.removeItem('jwc-theme');
      localStorage.setItem('jwc-theme-default', THEME.defaultMode);
    }
    const resolved: Theme = (configChanged ? null : stored) ?? THEME.defaultMode;
    setTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);

    const timer = setTimeout(() => {
      document.documentElement.classList.add('transitions-ready');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('jwc-theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
