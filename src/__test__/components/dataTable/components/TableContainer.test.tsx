import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DataTableProvider } from '@components/dataTable/context';
import { TableContainer } from '@components/dataTable/components/TableContainer';

// Mocks dos subcomponentes
vi.mock('@components/dataTable/components/header', () => ({
  TbHeader: () => <thead data-testid='tb-header'>Mock Header</thead>,
}));
vi.mock('@components/dataTable/components/body', () => ({
  TbBody: () => <tbody data-testid='tb-body'>Mock Body</tbody>,
}));
vi.mock('@components/dataTable/components/footer', () => ({
  TbFooter: () => <div data-testid='tb-footer'>Mock Footer</div>,
}));

// Real components

describe('TableContainer', () => {
  it('should render the table structure with header, body, and footer', () => {
    const mockDataService = vi.fn().mockResolvedValue([]);
    const mockOnRowClick = vi.fn();
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <DataTableProvider
          columns={[{ uniqueId: '1', key: 'id', label: 'ID' }]}
          onRowClick={mockOnRowClick}
          dataService={mockDataService}
        >
          <TableContainer />
        </DataTableProvider>
      </QueryClientProvider>
    );

    expect(screen.getByTestId('tb-header')).toBeInTheDocument();
    expect(screen.getByTestId('tb-body')).toBeInTheDocument();
    expect(screen.getByTestId('tb-footer')).toBeInTheDocument();

    expect(screen.getByTestId('header-table')).toBeInTheDocument();
    expect(screen.getByTestId('body-table')).toBeInTheDocument();
  });
});
