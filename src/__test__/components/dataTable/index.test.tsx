import { DataTable } from '@components/dataTable';
import type { dataTableColumnType, Props } from '@components/dataTable/context/types';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import React from 'react';

vi.mock('@components/dataTable/components/TableContainer', () => ({
  TableContainer: () => <div data-testid='table-container' />,
}));

vi.mock('@components/dataTable/context', () => ({
  DataTableProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='provider'>{children}</div>
  ),
}));

type RowData = { id: number; name: string }; // Generic test data for type parameter <T>

describe('DataTable', () => {
  const columns: dataTableColumnType[] = [
    {
      uniqueId: 'name-col',
      key: 'name',
      label: 'Nome',
    },
  ];

  const mockDataService: Props<RowData>['dataService'] = async () => {
    return Promise.resolve([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
  };
  const renderWithClient = (ui: React.ReactElement) => {
    const queryClient = new QueryClient();
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  };

  it('should display a message if there are no columns', () => {
    renderWithClient(
      <DataTable<RowData>
        columns={[]}
        onRowClick={() => {}}
        dataService={mockDataService}
      />
    );
    expect(screen.getByText('No columns defined.')).toBeInTheDocument();
  });

  it('should display a message if dataService is invalid', () => {
    // @ts-expect-error testing with invalid value intentionally
    renderWithClient(<DataTable<RowData> columns={columns} dataService={null} />);
    expect(
      screen.getByText('Invalid data service provided.')
    ).toBeInTheDocument();
  });

  it('should render the component with valid data', () => {
    renderWithClient(
      <DataTable<RowData>
        columns={columns}
        onRowClick={() => {}}
        dataService={mockDataService}
      />
    );
    expect(screen.getByTestId('provider')).toBeInTheDocument();
    expect(screen.getByTestId('table-container')).toBeInTheDocument();
  });
});
