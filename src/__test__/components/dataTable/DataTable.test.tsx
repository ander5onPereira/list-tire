import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { waitFor } from '@testing-library/react';
import { useDataTableQuery } from '@components/dataTable/hook/useDataTableQuery';

function wrapperFactory() {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useDataTableQuery', () => {
  it('returns expected data and calls dataService with correct parameters', async () => {
    const mockData = [{ id: 1, name: 'Test' }];
    const dataService = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(
      () =>
        useDataTableQuery({
          dataService,
          textQuery: 'foo', // filtros
          pageSize: 10, // pageSize
          pageNumber: 1, // pageNumber
          branchOfficesId: 215,
          companyId: 3,
        }),
      { wrapper: wrapperFactory() }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockData);
    expect(dataService).toHaveBeenCalledWith({
      textQuery: 'foo',
      pageSize: 10,
      pageNumber: 1,
      branchOfficesId: 215,
      companyId: 3,
    });
  });
});
