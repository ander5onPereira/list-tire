// useDataTableQuery.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDataTableQuery } from './useDataTableQuery';
interface Item {
  id: number;
  name: string;
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

describe('useDataTableQuery', () => {
  it('deve retornar dados do dataService', async () => {
    const dataServiceMock = vi.fn().mockResolvedValue([{ id: 1, name: 'Teste' }]);

    function Consumer() {
      const { data, isLoading } = useDataTableQuery<Item>(
        dataServiceMock,
        { search: 'abc' },
        { name: 'asc' },
        10,
        0
      );

      if (isLoading) return <p>Carregando...</p>;
      return <div>Data: {data?.[0]?.name}</div>;
    }

    render(
      <Wrapper>
        <Consumer />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Data: Teste')).toBeInTheDocument();
    });

    expect(dataServiceMock).toHaveBeenCalledWith({
      filters: { search: 'abc' },
      sortState: { name: 'asc' },
      pageSize: 10,
      pageNumber: 0,
    });
  });
});
