import { createContext, useCallback, useState } from 'react';

import {
  defaultDataTableContextV1,
  type DataTableContextInterfaceV1,
  type PropsProviderV1,
} from './types';

const DataTableContextV1 = createContext<DataTableContextInterfaceV1>(
  defaultDataTableContextV1
);
export function DataTableV1Provider(props: PropsProviderV1) {
  const { columns, onRowClick, data, isLoading = false, children } = props;

  const [filters, setFilters] = useState<string>('');
  const [pageSize, setItemsPerPage] = useState(10);
  const [pageNumber, setCurrentPage] = useState(0);

  function updateFilters(value: string) {
    setFilters(value);
  }
  function searchTires(tires: any[], search: string): any[] {
    if (!search) return tires;

    const normalizedSearch = search.toLowerCase();

    return tires.filter((tire) => {
      const idMatch = tire.id.toString().includes(search);
      const dotMatch = tire.dot?.toString().includes(search);
      return (
        idMatch ||
        tire.serialNumber?.toLowerCase().includes(normalizedSearch) ||
        tire.make?.name?.toLowerCase().includes(normalizedSearch) ||
        tire.model?.name?.toLowerCase().includes(normalizedSearch) ||
        dotMatch ||
        tire.status?.toLowerCase().includes(normalizedSearch)
      );
    });
  }
  const paginate = useCallback(() => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;
    console.log({ data, filters });
    const items =
      filters.length > 0
        ? searchTires(data, filters).slice(startIndex, endIndex)
        : data.slice(startIndex, endIndex);

    return {
      currentPage: pageNumber,
      pageSize,
      totalItems,
      totalPages,
      items: items || [],
    };
  }, [data, pageSize, pageNumber, filters]);

  return (
    <DataTableContextV1.Provider
      value={{
        filters,
        data: paginate().items,
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
    </DataTableContextV1.Provider>
  );
}

export default DataTableContextV1;
