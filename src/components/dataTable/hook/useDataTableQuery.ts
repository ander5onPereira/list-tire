import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Props } from '../context/types';

interface DataTableProps<T> {
  dataService: Props<T>["dataService"];
  textQuery?: string;
  pageSize: number;
  pageNumber: number;
  branchOfficesId:number,
  companyId:number,
  [key: string]: any;
}

export function useDataTableQuery<T>(props: DataTableProps<T>) {
  const { dataService, textQuery, pageSize, pageNumber,branchOfficesId,companyId } = props;

  return useQuery<T[]>({
    queryKey: ['data-grid', textQuery, pageSize, pageNumber],
    queryFn: () => dataService({ textQuery, pageSize, pageNumber,branchOfficesId,companyId }),
    staleTime: 60_000,
    placeholderData:keepPreviousData
  });
}
