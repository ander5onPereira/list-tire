import type { Dispatch, SetStateAction } from "react";

export interface dataTableColumnType {
  uniqueId: string;
  key: string;
  label: string;
  filter?: boolean;
  filterType?: 'text' | 'range';
  className?: string;
  render?: Function;
  avoidRowClick?: boolean;
}
export interface Props<T = any> {
  children: React.ReactNode;
  columns: dataTableColumnType[];
  onRowClick?: Function;
  dataService: (params: {
    pageSize: number;
    pageNumber: number;
    filters: Record<string, string>;
    sortState: Record<string, string>;
  }) => Promise<T[]>;
}
export interface DataTableContextInterface {
  filters: { [key: string]: string };
  setFilter: (key: string, value: string) => void;
  setFilters: Dispatch<SetStateAction<{ [key: string]: string }>>;
  data: Record<string, any>[];
  columns: dataTableColumnType[];
  pageSize: number;
  setItemsPerPage: Function;
  pageNumber: number;
  setCurrentPage: Function;
  onRowClick?: Function;
  sortState: { [key: string]: string };
  setSortState: Function;
  isLoading: boolean;
}

export const defaultDataTableContext: DataTableContextInterface = {
  filters: {},
  setFilter: () => {},
  setFilters: () => {},
  data: [],
  columns: [],
  pageSize: 0,
  setItemsPerPage: () => {},
  pageNumber: 0,
  setCurrentPage: () => {},
  sortState: {},
  setSortState: () => {},
  isLoading: false,
};
