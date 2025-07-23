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

export function DataTableProvider(props: Props) {
  const { columns, onRowClick, dataService, children } = props;

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortState, setSortState] = useState<Record<string, string>>({});
  const [pageSize, setItemsPerPage] = useState(10);
  const [pageNumber, setCurrentPage] = useState(0);

  const { data = [], isLoading } = useDataTableQuery(
    dataService,
    filters,
    sortState,
    pageSize,
    pageNumber
  );
  return (
    <DataTableContext.Provider
      value={{
        filters,
        setFilters,
        data,
        columns,
        setFilter: (key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
        },
        pageSize,
        setItemsPerPage,
        pageNumber,
        setCurrentPage,
        onRowClick,
        sortState,
        setSortState,
        isLoading,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export default DataTableContext;
