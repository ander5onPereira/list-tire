import { render, screen } from '@testing-library/react';
import { DataTable } from './';
import type { Props, dataTableColumnType } from './types';
import React from 'react';

vi.mock('./components/TableContainer', () => ({
  TableContainer: () => <div data-testid="table-container" />,
}));

vi.mock('./context', () => ({
  DataTableProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div data-testid="provider">{children}</div>,
}));

type RowData = { id: number; name: string }; // Exemplo genérico de dados para <T>

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

  it('deve exibir mensagem se não houver colunas', () => {
    render(
      <DataTable<RowData> columns={[]} onRowClick={() => {}} dataService={mockDataService} />
    );
    expect(screen.getByText('No columns defined.')).toBeInTheDocument();
  });

  it('deve exibir mensagem se dataService for inválido', () => {
    // @ts-expect-error testando valor inválido de propósito
    render(<DataTable<RowData> columns={columns} dataService={null} />);
    expect(screen.getByText('Invalid data service provided.')).toBeInTheDocument();
  });

  it('deve renderizar o componente com dados válidos', () => {
    render(
      <DataTable<RowData> columns={columns} onRowClick={() => {}} dataService={mockDataService} />
    );
    expect(screen.getByTestId('provider')).toBeInTheDocument();
    expect(screen.getByTestId('table-container')).toBeInTheDocument();
  });
});
