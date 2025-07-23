import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Props } from '../types';

export function useDataTableQuery<T>(
  dataService: Props<T>["dataService"],
  filters: Record<string, string>,
  sortState: Record<string, string>,
  pageSize: number,
  pageNumber: number
) {
  return useQuery<T[]>({
    queryKey: ['data-grid', filters, sortState, pageSize, pageNumber],
    queryFn: () => dataService({ filters, sortState, pageSize, pageNumber }),
    staleTime: 60_000,
    placeholderData:keepPreviousData
  });
}
