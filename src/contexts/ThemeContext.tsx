import { createContext, useState } from 'react';

type ThemeContextType = {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
};

const currentTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';

export const ThemeContext = createContext<ThemeContextType>({
  mode: currentTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(currentTheme);

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
  };
  return <ThemeContext.Provider value={{ mode, toggleTheme }}>{children}</ThemeContext.Provider>;
};
