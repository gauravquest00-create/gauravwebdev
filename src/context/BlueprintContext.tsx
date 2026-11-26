'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

interface BlueprintContextValue {
  isOpen: boolean;
  runKey: number;
  close: () => void;
  replay: () => void;
}

const BlueprintContext = createContext<BlueprintContextValue | undefined>(undefined);

export function BlueprintProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [runKey, setRunKey] = useState(1);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const replay = useCallback(() => {
    setRunKey((k) => k + 1);
    setIsOpen(true);
  }, []);

  return (
    <BlueprintContext.Provider value={{ isOpen, runKey, close, replay }}>
      {children}
    </BlueprintContext.Provider>
  );
}

export function useBlueprint() {
  const ctx = useContext(BlueprintContext);
  if (!ctx) {
    throw new Error('useBlueprint must be used inside BlueprintProvider');
  }
  return ctx;
}
