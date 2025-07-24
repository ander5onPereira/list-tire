import { createContext, useState } from 'react';
import { useDataTableQuery } from '../hook/useDataTableQuery';

import {
  defaultDataTableContext,
  type DataTableContextInterface,
  type Props,
} from './types';

const DataTableContext = createContext<DataTableContextInterface>(
  defaultDataTableContext
);

const BRANCH_OFFICES_ID = Number(import.meta.env.VITE_API_BRANCH_OFFICES_ID ?? 0); // value defined by the documentation description
const COMPANY_ID = Number(import.meta.env.VITE_API_COMPANY_ID ?? 0); //value defined by the documentation description
export function DataTableProvider(props: Props) {
  const { columns, onRowClick, dataService, children } = props;

  const [filters, setFilters] = useState<string>('');
  const [pageSize, setItemsPerPage] = useState(10);
  const [pageNumber, setCurrentPage] = useState(0);

  function updateFilters(value: string) {
    setFilters(value);
  }

  const { data = [], isLoading } = useDataTableQuery({
    dataService,
    textQuery: filters,
    pageSize,
    pageNumber,
    branchOfficesId: BRANCH_OFFICES_ID,
    companyId: COMPANY_ID, 
  });
  return (
    <DataTableContext.Provider
      value={{
        filters,
        data,
        columns,
        updateFilters,
        pageSize,
        setItemsPerPage,
        pageNumber,
        setCurrentPage,
        onRowClick,
        isLoading,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export default DataTableContext;
