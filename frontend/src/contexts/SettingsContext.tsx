import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: string;
  setLanguage: (lang: string) => void;
  profileName: string;
  setProfileName: (name: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('fifa-theme') as Theme) || 'system';
  });
  
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('fifa-language') || 'English';
  });
  
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem('fifa-profileName') || 'Alex Johnson';
  });

  useEffect(() => {
    localStorage.setItem('fifa-theme', theme);
    
    // Apply dark mode class to root HTML element
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fifa-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('fifa-profileName', profileName);
  }, [profileName]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage, profileName, setProfileName }}>
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
};
