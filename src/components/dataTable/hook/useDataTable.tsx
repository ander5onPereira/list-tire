import { useContext } from 'react';
import DataTableContext from '../context';
import { defaultDataTableContext } from '../context/types';


export function useDataTable() {
  const context = useContext(DataTableContext);
  if (context === defaultDataTableContext) {
    throw new Error('useDataTable must be used within a DataTableProvider');
  }
  return context;
}
