import React, { createContext, useContext, useState } from 'react';

interface ThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  primary: '#007AFF',
  background: '#FFFFFF',
  card: '#F5F5F5',
  text: '#1C1C1E',
  border: '#D1D1D6'
};

const darkColors: ThemeColors = {
  primary: '#0A84FF',
  background: '#1C1C1E',
  card: '#2C2C2E',
  text: '#FFFFFF',
  border: '#3A3A3C'
};

const ThemeContext = createContext<ThemeContextType>({
  colors: lightColors,
  isDark: false,
  toggleTheme: () => {}
});

const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{
      colors: isDark ? darkColors : lightColors,
      isDark,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
