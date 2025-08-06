import { useContext } from 'react';
import DataTableContextV1 from '../context';
import { defaultDataTableContextV1 } from '../context/types';


export function useDataTableV1() {
  const context = useContext(DataTableContextV1);
  if (context === defaultDataTableContextV1) {
    throw new Error('useDataTableV1 must be used within a DataTableProviderV1');
  }
  return context;
}
