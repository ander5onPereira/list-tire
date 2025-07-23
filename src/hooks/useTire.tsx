import { useContext } from 'react';
import TireContext from '../context/TireContext';
import { defaultTireContext } from '../context/typeTire';

export function useTire() {
  const context = useContext(TireContext);

  if (context === defaultTireContext) {
    throw new Error('useTire must be used within a TireProvider');
  }
  return context;
}
