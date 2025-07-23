import { DataTableProvider } from '@components/dataTable/context';
import type { dataTableColumnType } from '@components/dataTable/context/types';
import { useDataTable } from '@components/dataTable/hook/useDataTable';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@components/dataTable/hook/useDataTableQuery', () => ({
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
  const { data, isLoading, updateFilters, filters } = useDataTable();

  return (
    <div>
      <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
      <p>Data length: {data.length}</p>
      <button onClick={() => updateFilters('value')}>Set Filter</button>
      <p>Filter value: {filters || 'none'}</p>
    </div>
  );
}

describe('useDataTable hook', () => {
  it('should access and modify the context correctly', async () => {
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

  it('should throw an error if used outside the provider', () => {
    expect(() => render(<TestComponent />)).toThrow(
      'useDataTable must be used within a DataTableProvider'
    );
  });
});
