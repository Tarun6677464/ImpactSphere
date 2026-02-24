import { useUiStore } from '../store/uiStore';
import { useLayoutEffect } from 'react';

export default function ThemeProvider({ children }) {
  const theme = useUiStore((s) => s.theme);

  useLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return children;
}
