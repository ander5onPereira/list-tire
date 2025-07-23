import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDataTableQuery } from '@components/dataTable/hook/useDataTableQuery';

interface Item {
  id: number;
  name: string;
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useDataTableQuery', () => {
  it('should return data from dataService', async () => {
    const dataServiceMock = vi
      .fn()
      .mockResolvedValue([{ id: 1, name: 'Teste' }]);

    function Consumer() {
      const { data, isLoading } = useDataTableQuery<Item>({
        dataService: dataServiceMock,
        pageSize: 10,
        pageNumber: 1,
        branchOfficesId: 215,
        companyId: 3,
      });

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
      pageSize: 10,
      pageNumber: 1,
      branchOfficesId: 215,
      companyId: 3,
    });
  });
});
