import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataTableProvider } from '../context';
import { useDataTable } from './useDataTable';
import type { dataTableColumnType } from '../context/types';

vi.mock('../hook/useDataTableQuery', () => ({
  useDataTableQuery: () => ({
    data: [{ id: 1, name: 'Test Item' }],
    isLoading: false,
  }),
}));

function TestComponent() {
  useDataTable();
  return null;
}
function ConsumerComponent() {
  const { data, isLoading, setFilter, filters } = useDataTable();

  return (
    <div>
      <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
      <p>Data length: {data.length}</p>
      <button onClick={() => setFilter('name', 'value')}>Set Filter</button>
      <p>Filter value: {filters['name'] || 'none'}</p>
    </div>
  );
}

describe('useDataTable hook', () => {
  it('deve acessar e modificar o contexto corretamente', async () => {
    const columns: dataTableColumnType[] = [
      { uniqueId: '1', key: 'id', label: 'ID' },
      { uniqueId: '2', key: 'name', label: 'Name' },
    ];

    const dataServiceMock = vi.fn().mockResolvedValue([]);

    render(
      <DataTableProvider columns={columns} dataService={dataServiceMock}>
        <ConsumerComponent />
      </DataTableProvider>
    );

    expect(screen.getByText('Loading: No')).toBeInTheDocument();
    expect(screen.getByText('Data length: 1')).toBeInTheDocument();
    expect(screen.getByText('Filter value: none')).toBeInTheDocument();

    screen.getByText('Set Filter').click();

    await waitFor(() => {
      expect(screen.getByText('Filter value: value')).toBeInTheDocument();
    });
  });

  it('deve lançar erro se usado fora do provider', () => {
    expect(() => render(<TestComponent />)).toThrow(
      'useDataTable must be used within a DataTableProvider'
    );
  });
});
