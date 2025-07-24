export interface dataTableColumnType {
  uniqueId: string;
  key: string;
  label: string;
  className?: string;
  render?: Function;
  avoidRowClick?: boolean;
}
export interface PropsProvider<T = any> {
  children: React.ReactNode;
  columns: dataTableColumnType[];
  onRowClick?: Function;
  dataService: (params: {
    pageSize: number;
    pageNumber: number;
    textQuery?: string;
    companyId: number;
    branchOfficesId: number;
  }) => Promise<T[]>;
}
export interface Props<T> {
  columns: dataTableColumnType[];
  onRowClick?: (row: T) => void;
  dataService: (params: {
    pageSize: number;
    pageNumber: number;
    textQuery?: string;
    companyId: number;
    branchOfficesId: number;
  }) => Promise<T[]>;
}


export interface DataTableContextInterface {
  filters: string;
  data: Record<string, any>[];
  columns: dataTableColumnType[];
  pageSize: number;
  setItemsPerPage: Function;
  pageNumber: number;
  setCurrentPage: Function;
  onRowClick?: Function;
  isLoading: boolean;
  updateFilters: Function;
}

export const defaultDataTableContext: DataTableContextInterface = {
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
