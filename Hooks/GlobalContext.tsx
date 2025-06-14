import React, { createContext, useContext, useState } from 'react';
import defaultSettings from '@/constants/DefaultSettings'

type SettingsType = {
  cloud_name: string;
  upload_preset: string;
  resource_type: string;
  tags: string[];
  folder: string;
  unsigned: boolean; 
};

type GlobalContextType = {
  settings: SettingsType;
  setSettings: (u: SettingsType) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);

  return (
    <GlobalContext.Provider value={{ settings, setSettings }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within GlobalProvider');
  }
  return context;
};
