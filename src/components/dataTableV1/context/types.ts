export interface dataTableColumnTypeV1 {
  uniqueId: string;
  key: string;
  label: string;
  className?: string;
  render?: Function;
  avoidRowClick?: boolean;
}
export interface PropsProviderV1<T = any> {
  children: React.ReactNode;
  columns: dataTableColumnTypeV1[];
  onRowClick?: Function;
  data: T[]|[];
  isLoading?: boolean;
}
export interface Props<T> {
  columns: dataTableColumnTypeV1[];
  onRowClick?: (row: T) => void;
  data: T[]|[];
  isLoading?: boolean;
}


export interface DataTableContextInterfaceV1 {
  filters: string;
  data: Record<string, any>[];
  columns: dataTableColumnTypeV1[];
  pageSize: number;
  setItemsPerPage: Function;
  pageNumber: number;
  setCurrentPage: Function;
  onRowClick?: Function;
  isLoading: boolean;
  updateFilters: Function;
}

export const defaultDataTableContextV1: DataTableContextInterfaceV1 = {
  filters: '',
  data: [],
  columns: [],
  pageSize: 0,
  setItemsPerPage: () => {},
  pageNumber: 0,
  setCurrentPage: () => {},
  isLoading: false,
  updateFilters: () => {},
};
