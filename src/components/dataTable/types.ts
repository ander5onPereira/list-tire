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

export interface Props<T> {
  columns: dataTableColumnType[];
  onRowClick?: (row: T) => void;
  dataService: (params: {
    pageSize: number;
    pageNumber: number;
    filters: Record<string, string>;
    sortState: Record<string, string>;
  }) => Promise<T[]>;
}
