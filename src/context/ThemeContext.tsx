
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { persistence } from '../utils/persistence';

interface ThemeSettings {
  theme: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
  fontSize: number;
  animationEnabled: boolean;
}

interface ThemeContextType {
  settings: ThemeSettings;
  updateSettings: (newSettings: Partial<ThemeSettings>) => void;
  resetSettings: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const defaultSettings: ThemeSettings = {
  theme: 'dark',
  primaryColor: '#1E40AF',
  secondaryColor: '#3B82F6',
  fontSize: 16,
  animationEnabled: true,
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);

  useEffect(() => {
    const loadSettings = async () => {
      const savedTheme = await persistence.getItem('theme');
      const savedPrimary = await persistence.getItem('primaryColor');
      const savedSecondary = await persistence.getItem('secondaryColor');
      const savedFontSize = await persistence.getItem('fontSize');
      const savedAnimation = await persistence.getItem('animationEnabled');
      setSettings({
        ...defaultSettings,
        theme: (savedTheme as 'light' | 'dark') || defaultSettings.theme,
        primaryColor: savedPrimary || defaultSettings.primaryColor,
        secondaryColor: savedSecondary || defaultSettings.secondaryColor,
        fontSize: parseInt(savedFontSize || defaultSettings.fontSize.toString()) || defaultSettings.fontSize,
        animationEnabled: savedAnimation === 'true' || defaultSettings.animationEnabled,
      });
    };
    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<ThemeSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await Promise.all([
      persistence.setItem('theme', updated.theme),
      persistence.setItem('primaryColor', updated.primaryColor),
      persistence.setItem('secondaryColor', updated.secondaryColor),
      persistence.setItem('fontSize', updated.fontSize.toString()),
      persistence.setItem('animationEnabled', updated.animationEnabled.toString()),
    ]);
  };

  const resetSettings = async () => {
    setSettings(defaultSettings);
    await Promise.all([
      persistence.setItem('theme', defaultSettings.theme),
      persistence.setItem('primaryColor', defaultSettings.primaryColor),
      persistence.setItem('secondaryColor', defaultSettings.secondaryColor),
      persistence.setItem('fontSize', defaultSettings.fontSize.toString()),
      persistence.setItem('animationEnabled', defaultSettings.animationEnabled.toString()),
    ]);
  };

  const value = { settings, updateSettings, resetSettings };

  const root = document.documentElement;
  root.style.setProperty('--primary-color', settings.primaryColor);
  root.style.setProperty('--secondary-color', settings.secondaryColor);
  root.style.setProperty('--bg-color', settings.theme === 'light' ? '#FFFFFF' : '#0F172A');
  root.style.setProperty('--text-color', settings.theme === 'light' ? '#333333' : '#F1F5F9');
  root.style.setProperty('--card-bg', settings.theme === 'light' ? '#F9FAFB' : '#1E293B');
  root.style.setProperty('--font-size-base', `${settings.fontSize}px`);
  if (!settings.animationEnabled) {
    root.style.setProperty('--animation-duration', '0s');
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
