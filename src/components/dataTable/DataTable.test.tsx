// src/components/dataTable/hook/useDataTableQuery.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDataTableQuery } from './hook/useDataTableQuery';
import { waitFor } from '@testing-library/react'; 


function wrapperFactory() {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useDataTableQuery', () => {
  it('retorna dados esperados e chama dataService com os parâmetros corretos', async () => {
    const mockData = [{ id: 1, name: 'Test' }];
    const dataService = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(
      () =>
        useDataTableQuery(
          dataService,
          { name: 'foo' }, // filtros
          { id: 'asc' },   // sort
          10,              // pageSize
          1                // pageNumber
        ),
      { wrapper: wrapperFactory() }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockData);
    expect(dataService).toHaveBeenCalledWith({
      filters: { name: 'foo' },
      sortState: { id: 'asc' },
      pageSize: 10,
      pageNumber: 1,
    });
  });
});
